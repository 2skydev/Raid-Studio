import { ReactNode, useState } from 'react'

import { CheckedState } from '@radix-ui/react-checkbox'
import { groupBy } from 'lodash'
import { ChevronDownIcon, HourglassIcon, Undo2Icon } from 'lucide-react'
import Image from 'next/image'
import { P, match } from 'ts-pattern'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'
import { icon } from '@styled-system/recipes'

import { Badge } from '@/components/Badge'
import Button from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip'

import RaidLabel from '@/features/raid/RaidLabel'

import { RAIDS } from '@/assets/data/raid'
import cooldownImage from '@/assets/images/stepCooldown.png'
import { CharacterWithClears } from '@/schemas/character'
import { Raid } from '@/types/raid'
import { getBestGoldRaidStatsByCharacter } from '@/utils/character'
import dayjs from '@/utils/day'

interface RaidTodoListItem {
  difficulty: Raid['difficulty'] | '하노'
  name: Raid['name']
}

export interface RaidTodoListProps {
  children?: ReactNode
  clears: CharacterWithClears['clears']
  fixedRaidIds: string[]
  onClear?: (raidId: string, step: number) => void
}

// 로스트아크 레이드 리셋 요일 (수)
const LOST_ARK_RESET_RAID_DAY = 3

const today = dayjs()

const thisWeekResetRaidDate = today.day(LOST_ARK_RESET_RAID_DAY).hour(6).minute(0).second(0)
const prevWeekResetRaidDate = today
  .day(LOST_ARK_RESET_RAID_DAY - 7)
  .hour(6)
  .minute(0)
  .second(0)

const thisResetRaidDate = match(today.day())
  // 오늘이 리셋 요일(수) 이라면 시간 비교
  .with(LOST_ARK_RESET_RAID_DAY, () =>
    today >= thisWeekResetRaidDate ? thisWeekResetRaidDate : prevWeekResetRaidDate,
  )

  // 오늘이 리셋 요일보다 크다면(목~토) 이라면 이번주 리셋 날짜 반환
  .with(
    P.when(day => day > LOST_ARK_RESET_RAID_DAY),
    () => thisWeekResetRaidDate,
  )

  // 오늘이 리셋 요일보다 작다면(일~화) 이라면 지난주 리셋 날짜 반환
  .otherwise(() => prevWeekResetRaidDate)

// console.log('---------------------------------------------')
// console.log('오늘:', today.format('MM월 DD일 HH:mm:ss dd'))
// console.log('이번주:', thisWeekResetRaidDate.format('MM월 DD일 HH:mm:ss dd'))
// console.log('지난주:', prevWeekResetRaidDate.format('MM월 DD일 HH:mm:ss dd'))
// console.log('결과값:', thisResetDate.format('MM월 DD일 HH:mm:ss dd'))
// console.log('---------------------------------------------')

const RaidTodoList = ({ clears, fixedRaidIds, onClear }: RaidTodoListProps) => {
  const [showAll, setShowAll] = useState(false)

  const clearsMap = new Map(Object.entries(groupBy(clears, 'raidId')))

  const handleClear = (raidId: string, step: number) => {
    onClear?.(raidId, step)
  }

  const showRaidIds = fixedRaidIds

  let raids = showRaidIds.map(id => {
    return RAIDS[id]
  })

  return (
    <div>
      <div className={css({ spaceY: '2' })}>
        {raids.map(raid => {
          const clearData = clearsMap.get(raid.id)
          const clearSteps = clearData?.map(clear => clear.step) ?? []
          const lastClearStep = Math.max(-1, ...clearSteps)

          const thisWeekClearSteps =
            clearData
              ?.filter(clear => dayjs(clear.createdAt) > thisResetRaidDate)
              .map(clear => clear.step) ?? []

          const thisWeekLastClearStep = Math.max(-1, ...thisWeekClearSteps)

          const cooldownClearSteps =
            clearData
              ?.filter(clear => !thisWeekClearSteps.includes(clear.step))
              .map(clear => clear.step) ?? []

          // console.log(name, raid.id, thisWeekClearSteps, cooldownClearSteps)

          const hasCooldown = raid.steps.some(
            step => step.cooldownWeek > 1 && clearSteps.includes(step.step),
          )

          const checked: CheckedState = match(thisWeekLastClearStep)
            .with(raid.steps.length, () => true)
            .with(-1, () => false)
            .otherwise(() => 'indeterminate')

          const status = match(checked)
            .with(true, () => '완료')
            .with(false, () => '클리어 안함')
            .with('indeterminate', () => `${thisWeekLastClearStep}관문 클리어`)
            .exhaustive()

          const variant = match(checked)
            .with(true, () => 'default' as const)
            .with(false, () => 'outline' as const)
            .with('indeterminate', () => 'secondary' as const)
            .exhaustive()

          return (
            <Flex key={raid.id} alignItems="center" justifyContent="space-between">
              <RaidLabel difficulty={raid.difficulty} name={raid.name} />

              <Flex alignItems="center" gap="1">
                {hasCooldown && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image src={cooldownImage} alt="cooldown" width={18} height={18} />
                    </TooltipTrigger>

                    <TooltipContent>특정 관문 쿨타임으로 진행 불가</TooltipContent>
                  </Tooltip>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Badge variant={variant} fontSize="xs" cursor="pointer">
                      {status}
                    </Badge>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    {checked && (
                      <DropdownMenuItem onClick={() => handleClear(raid.id, 0)}>
                        <Undo2Icon className={icon()} />
                        되돌리기
                      </DropdownMenuItem>
                    )}

                    {raid.steps.map(step => {
                      const isCooldown = cooldownClearSteps.includes(step.step)
                      const clearedAt = isCooldown
                        ? clearData?.find(clear => clear.step === step.step)?.createdAt
                        : null

                      return (
                        <DropdownMenuItem
                          key={step.step}
                          onClick={() => handleClear(raid.id, step.step)}
                          disabled={step.step <= thisWeekLastClearStep || isCooldown}
                        >
                          {isCooldown && <HourglassIcon size="1rem" />}
                          {step.step}관문 클리어
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                {checked !== true && (
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => handleClear(raid.id, raid.steps.length)}
                  />
                )}
              </Flex>
            </Flex>
          )
        })}
      </div>

      <Button mt="2" p="0" variant="ghost" w="full" h="6" onClick={() => setShowAll(v => !v)}>
        <ChevronDownIcon size="1rem" />
      </Button>
    </div>
  )
}

export default RaidTodoList

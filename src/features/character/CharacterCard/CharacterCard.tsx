import { ReactNode } from 'react'

import { CheckedState } from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { Undo2Icon } from 'lucide-react'
import Image from 'next/image'
import { match } from 'ts-pattern'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'
import { icon } from '@styled-system/recipes'

import { Badge } from '@/components/Badge'
import { Checkbox } from '@/components/Checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { Separator } from '@/components/Separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip'

import CharacterClassIcon from '@/features/character/CharacterClassIcon'

import { RAIDS_ARRAY_ORDER_BY_GOLD_DESC, RAID_RESET_REFERENCE_DATE } from '@/assets/data/raid'
import cooldownImage from '@/assets/images/stepCooldown.png'
import { CharacterWithClears } from '@/schemas/character'
import { CharacterClassName } from '@/types/character'

export interface CharacterCardProps {
  characterClassName: CharacterClassName
  name: string
  level: number
  clears: CharacterWithClears['clears']
  children?: ReactNode
  onClear?: (name: string, raidId: string, step: number) => void
}

const testRaids = RAIDS_ARRAY_ORDER_BY_GOLD_DESC.slice(0, 3)

const lostArkServerDiffWeek = Math.abs(dayjs('2023-10-24').diff(RAID_RESET_REFERENCE_DATE, 'week'))

const CharacterCard = ({
  characterClassName,
  name,
  level,
  clears,
  onClear,
}: CharacterCardProps) => {
  const clearsMap = new Map(Object.entries(groupBy(clears, 'raidId')))

  const handleClear = (raidId: string, step: number) => {
    onClear?.(name, raidId, step)
  }

  return (
    <div className={css({ w: '80', rounded: 'md', border: 'base', p: '4' })}>
      <Flex alignItems="center">
        <CharacterClassIcon characterClassName={characterClassName} width={26} height={26} />

        <div className={css({ ml: '3' })}>
          <div className={css({ fontSize: 'sm', fontWeight: 'medium', leading: 'tight' })}>
            {name}
          </div>
          <div
            className={css({
              fontSize: 'xs',
              color: 'muted.foreground',
              leading: 'tight',
            })}
          >
            {characterClassName} / {level}
          </div>
        </div>
      </Flex>

      <Separator my="3" />

      <div className={css({ spaceY: '2' })}>
        {testRaids.map(raid => {
          const clearData = clearsMap.get(raid.id)
          const clearSteps = clearData?.map(clear => clear.step) ?? []
          const lastClearStep = Math.max(-1, ...clearSteps)
          const hasCooldown = raid.steps.some(
            step => step.cooldownWeek > 1 && clearSteps.includes(step.step),
          )

          const checked: CheckedState = match(lastClearStep)
            .with(raid.steps.length, () => true)
            .with(-1, () => false)
            .otherwise(() => 'indeterminate')

          const status = match(checked)
            .with(true, () => '완료')
            .with(false, () => '클리어 안함')
            .with('indeterminate', () => `${lastClearStep}관문 클리어`)
            .exhaustive()

          const variant = match(checked)
            .with(true, () => 'default' as const)
            .with(false, () => 'outline' as const)
            .with('indeterminate', () => 'secondary' as const)
            .exhaustive()

          return (
            <Flex key={raid.id} alignItems="center" justifyContent="space-between">
              <div className={css({ fontSize: 'sm', leading: '1' })}>
                <span
                  className={css({
                    color: raid.difficulty === '노말' ? 'blue.300' : 'orange.500',
                  })}
                >
                  {raid.difficulty}
                </span>{' '}
                {raid.name}
              </div>

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

                    {raid.steps.map(step => (
                      <DropdownMenuItem
                        key={step.step}
                        onClick={() => handleClear(raid.id, step.step)}
                      >
                        {step.step}관문 클리어
                      </DropdownMenuItem>
                    ))}
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
    </div>
  )
}

export default CharacterCard

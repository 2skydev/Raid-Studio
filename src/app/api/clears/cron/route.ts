import dayjs from 'dayjs'
import { pick } from 'lodash'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { RAIDS, RAID_RESET_REFERENCE_DATE } from '@/assets/data/raid'
import collections from '@/libs/db/collections'
import { createCustomErrorResponse } from '@/utils/api'

export async function GET(request: NextRequest) {
  // const authHeader = request.headers.get('authorization')

  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return createCustomErrorResponse('Cron 인증 실패', 401)
  // }

  const weekDiff = Math.abs(dayjs('2023-10-24').diff(RAID_RESET_REFERENCE_DATE, 'week'))

  const protectClearRaid = Object.values(RAIDS).reduce(
    (acc, raid) => {
      const steps = raid.steps.filter(step => step.cooldownWeek > 1)

      return [
        ...acc,
        ...steps.reduce((acc2: { id: string; step: number }[], step) => {
          if (step.cooldownWeek > 1) {
            const week = weekDiff % step.cooldownWeek

            if (week !== 0) {
              acc2.push({
                id: raid.id,
                step: step.step,
              })
            }
          }

          return acc2
        }, []),
      ]
    },
    [] as { id: string; step: number }[],
  )

  const result = await collections.clears.deleteMany({
    $nor: protectClearRaid.map(step => ({
      raidId: step.id,
      step: step.step,
    })),
  })

  return NextResponse.json(result)
}

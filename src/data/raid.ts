import { Raid } from '@/types/raid'

/**
 * 레이드 초기화 기준 날짜 (로스트아크 서버 기준)
 * @description 2주 쿨타임 레이드 같은 경우에 사용됩니다.
 */
export const RAID_RESET_REFERENCE_DATE = '2023-10-11'

/**
 * 전체 레이드 목록 (어비스 던전 포함)
 * @description 레이드 정보를 수정하려면 이곳을 수정하세요. 정렬 필요 없음.
 */
export const RAIDS: Record<string, Raid> = {
  발탄_노말: {
    id: '발탄_노말',
    name: '발탄',
    difficulty: '노말',
    minLevel: 1415,
    steps: [
      {
        step: 1,
        level: 1415,
        cooldownWeek: 1,
        gold: 500,
      },
      {
        step: 2,
        level: 1415,
        cooldownWeek: 1,
        gold: 700,
      },
    ],
  },
  발탄_하드: {
    id: '발탄_하드',
    name: '발탄',
    difficulty: '하드',
    minLevel: 1445,
    steps: [
      {
        step: 1,
        level: 1445,
        cooldownWeek: 1,
        gold: 700,
      },
      {
        step: 2,
        level: 1445,
        cooldownWeek: 1,
        gold: 1100,
      },
    ],
  },
  비아키스_노말: {
    id: '비아키스_노말',
    name: '비아키스',
    difficulty: '노말',
    minLevel: 1430,
    steps: [
      {
        step: 1,
        level: 1430,
        cooldownWeek: 1,
        gold: 600,
      },
      {
        step: 2,
        level: 1430,
        cooldownWeek: 1,
        gold: 1000,
      },
    ],
  },
  비아키스_하드: {
    id: '비아키스_하드',
    name: '비아키스',
    difficulty: '하드',
    minLevel: 1460,
    steps: [
      {
        step: 1,
        level: 1460,
        cooldownWeek: 1,
        gold: 900,
      },
      {
        step: 2,
        level: 1460,
        cooldownWeek: 1,
        gold: 1500,
      },
    ],
  },
  쿠크세이튼_노말: {
    id: '쿠크세이튼_노말',
    name: '쿠크세이튼',
    difficulty: '노말',
    minLevel: 1475,
    steps: [
      {
        step: 1,
        level: 1475,
        cooldownWeek: 1,
        gold: 600,
      },
      {
        step: 2,
        level: 1475,
        cooldownWeek: 1,
        gold: 900,
      },
      {
        step: 3,
        level: 1475,
        cooldownWeek: 1,
        gold: 1500,
      },
    ],
  },
  아브렐슈드_노말: {
    id: '아브렐슈드_노말',
    name: '아브렐슈드',
    difficulty: '노말',
    minLevel: 1490,
    steps: [
      {
        step: 1,
        level: 1490,
        cooldownWeek: 1,
        gold: 1500,
      },
      {
        step: 2,
        level: 1490,
        cooldownWeek: 1,
        gold: 1500,
      },
      {
        step: 3,
        level: 1500,
        cooldownWeek: 1,
        gold: 1500,
      },
      {
        step: 4,
        level: 1520,
        cooldownWeek: 2,
        gold: 2500,
      },
    ],
  },
  아브렐슈드_하드: {
    id: '아브렐슈드_하드',
    name: '아브렐슈드',
    difficulty: '하드',
    minLevel: 1540,
    steps: [
      {
        step: 1,
        level: 1540,
        cooldownWeek: 1,
        gold: 2000,
      },
      {
        step: 2,
        level: 1540,
        cooldownWeek: 1,
        gold: 2000,
      },
      {
        step: 3,
        level: 1550,
        cooldownWeek: 1,
        gold: 2000,
      },
      {
        step: 4,
        level: 1560,
        cooldownWeek: 2,
        gold: 3000,
      },
    ],
  },
  일리아칸_노말: {
    id: '일리아칸_노말',
    name: '일리아칸',
    difficulty: '노말',
    minLevel: 1580,
    steps: [
      {
        step: 1,
        level: 1580,
        cooldownWeek: 1,
        gold: 1500,
      },
      {
        step: 2,
        level: 1580,
        cooldownWeek: 1,
        gold: 2000,
      },
      {
        step: 3,
        level: 1580,
        cooldownWeek: 1,
        gold: 4000,
      },
    ],
  },
  일리아칸_하드: {
    id: '일리아칸_하드',
    name: '일리아칸',
    difficulty: '하드',
    minLevel: 1600,
    steps: [
      {
        step: 1,
        level: 1600,
        cooldownWeek: 1,
        gold: 1750,
      },
      {
        step: 2,
        level: 1600,
        cooldownWeek: 1,
        gold: 2500,
      },
      {
        step: 3,
        level: 1600,
        cooldownWeek: 1,
        gold: 5750,
      },
    ],
  },
  카멘_노말: {
    id: '카멘_노말',
    name: '카멘',
    difficulty: '노말',
    minLevel: 1610,
    steps: [
      {
        step: 1,
        level: 1610,
        cooldownWeek: 1,
        gold: 3500,
      },
      {
        step: 2,
        level: 1610,
        cooldownWeek: 1,
        gold: 4000,
      },
      {
        step: 3,
        level: 1610,
        cooldownWeek: 1,
        gold: 5500,
      },
    ],
  },
  카멘_하드: {
    id: '카멘_하드',
    name: '카멘',
    difficulty: '하드',
    minLevel: 1630,
    steps: [
      {
        step: 1,
        level: 1630,
        cooldownWeek: 1,
        gold: 5000,
      },
      {
        step: 2,
        level: 1630,
        cooldownWeek: 1,
        gold: 6000,
      },
      {
        step: 3,
        level: 1630,
        cooldownWeek: 1,
        gold: 9000,
      },
      {
        step: 4,
        level: 1630,
        cooldownWeek: 2,
        gold: 21000,
      },
    ],
  },
  카양겔_노말: {
    id: '카양겔_노말',
    name: '카양겔',
    difficulty: '노말',
    minLevel: 1540,
    steps: [
      {
        step: 1,
        level: 1540,
        cooldownWeek: 1,
        gold: 1000,
      },
      {
        step: 2,
        level: 1540,
        cooldownWeek: 1,
        gold: 1500,
      },
      {
        step: 3,
        level: 1540,
        cooldownWeek: 1,
        gold: 2000,
      },
    ],
  },
  카양겔_하드: {
    id: '카양겔_하드',
    name: '카양겔',
    difficulty: '하드',
    minLevel: 1580,
    steps: [
      {
        step: 1,
        level: 1580,
        cooldownWeek: 1,
        gold: 1500,
      },
      {
        step: 2,
        level: 1580,
        cooldownWeek: 1,
        gold: 2000,
      },
      {
        step: 3,
        level: 1580,
        cooldownWeek: 1,
        gold: 3000,
      },
    ],
  },
  혼돈의상아탑_노말: {
    id: '혼돈의상아탑_노말',
    name: '혼돈의 상아탑',
    difficulty: '노말',
    minLevel: 1600,
    steps: [
      {
        step: 1,
        level: 1600,
        cooldownWeek: 1,
        gold: 1500,
      },
      {
        step: 2,
        level: 1600,
        cooldownWeek: 1,
        gold: 1750,
      },
      {
        step: 3,
        level: 1600,
        cooldownWeek: 1,
        gold: 2500,
      },
      {
        step: 4,
        level: 1600,
        cooldownWeek: 1,
        gold: 3250,
      },
    ],
  },
  혼돈의상아탑_하드: {
    id: '혼돈의상아탑_하드',
    name: '혼돈의 상아탑',
    difficulty: '하드',
    minLevel: 1620,
    steps: [
      {
        step: 1,
        level: 1620,
        cooldownWeek: 1,
        gold: 2000,
      },
      {
        step: 2,
        level: 1620,
        cooldownWeek: 1,
        gold: 2500,
      },
      {
        step: 3,
        level: 1620,
        cooldownWeek: 1,
        gold: 4000,
      },
      {
        step: 4,
        level: 1620,
        cooldownWeek: 1,
        gold: 6000,
      },
    ],
  },
}

export const RAIDS_ARRAY_ORDER_BY_GOLD_DESC = Object.values(RAIDS).sort((a, b) => {
  const aGold = a.steps.reduce((acc, cur) => acc + cur.gold, 0)
  const bGold = b.steps.reduce((acc, cur) => acc + cur.gold, 0)

  return bGold - aGold
})

import { ComponentProps } from 'react'

import Image from 'next/image'

import arcana_image from '@/assets/images/class/emblem_arcana.svg'
import bard_image from '@/assets/images/class/emblem_bard.svg'
import battle_master_image from '@/assets/images/class/emblem_battle_master.svg'
import battle_master_male_image from '@/assets/images/class/emblem_battle_master_male.svg'
import berserker_image from '@/assets/images/class/emblem_berserker.svg'
import berserker_female_image from '@/assets/images/class/emblem_berserker_female.svg'
import blade_image from '@/assets/images/class/emblem_blade.svg'
import blaster_image from '@/assets/images/class/emblem_blaster.svg'
import demonic_image from '@/assets/images/class/emblem_demonic.svg'
import destroyer_image from '@/assets/images/class/emblem_destroyer.svg'
import devil_hunter_image from '@/assets/images/class/emblem_devil_hunter.svg'
import devil_hunter_female_image from '@/assets/images/class/emblem_devil_hunter_female.svg'
import elemental_master_image from '@/assets/images/class/emblem_elemental_master.svg'
import force_master_image from '@/assets/images/class/emblem_force_master.svg'
import hawk_eye_image from '@/assets/images/class/emblem_hawk_eye.svg'
import holyknight_image from '@/assets/images/class/emblem_holyknight.svg'
import infighter_image from '@/assets/images/class/emblem_infighter.svg'
import lance_master_image from '@/assets/images/class/emblem_lance_master.svg'
import reaper_image from '@/assets/images/class/emblem_reaper.svg'
import scouter_image from '@/assets/images/class/emblem_scouter.svg'
import soul_eater_image from '@/assets/images/class/emblem_soul_eater.svg'
import summoner_image from '@/assets/images/class/emblem_summoner.svg'
import warlord_image from '@/assets/images/class/emblem_warlord.svg'
import weather_artist_image from '@/assets/images/class/emblem_weather_artist.svg'
import yinyangshi_image from '@/assets/images/class/emblem_yinyangshi.svg'
import { CharacterClassName } from '@/types/character'

const IMAGE_MAP = {
  인파이터: infighter_image,
  호크아이: hawk_eye_image,
  슬레이어: berserker_female_image,
  데모닉: demonic_image,
  도화가: yinyangshi_image,
  배틀마스터: battle_master_image,
  창술사: lance_master_image,
  스카우터: scouter_image,
  기공사: force_master_image,
  홀리나이트: holyknight_image,
  소울이터: soul_eater_image,
  아르카나: arcana_image,
  소서리스: elemental_master_image,
  데빌헌터: devil_hunter_image,
  디스트로이어: destroyer_image,
  리퍼: reaper_image,
  버서커: berserker_image,
  스트라이커: battle_master_male_image,
  건슬링어: devil_hunter_female_image,
  바드: bard_image,
  블래스터: blaster_image,
  서머너: summoner_image,
  기상술사: weather_artist_image,
  블레이드: blade_image,
  워로드: warlord_image,
}

export interface CharacterClassIconProps extends Partial<ComponentProps<typeof Image>> {
  characterClassName: CharacterClassName
}

const CharacterClassIcon = ({ characterClassName, ...props }: CharacterClassIconProps) => {
  return (
    <Image
      src={IMAGE_MAP[characterClassName]}
      alt={characterClassName}
      width={32}
      height={32}
      className="dark:invert"
      {...props}
    />
  )
}

export default CharacterClassIcon

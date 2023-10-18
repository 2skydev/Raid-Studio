import { ComponentProps } from 'react'

import Image from 'next/image'

import arcana_image from '@/assets/images/class/emblem_arcana.png'
import bard_image from '@/assets/images/class/emblem_bard.png'
import battle_master_image from '@/assets/images/class/emblem_battle_master.png'
import battle_master_male_image from '@/assets/images/class/emblem_battle_master_male.png'
import berserker_image from '@/assets/images/class/emblem_berserker.png'
import berserker_female_image from '@/assets/images/class/emblem_berserker_female.png'
import blade_image from '@/assets/images/class/emblem_blade.png'
import blaster_image from '@/assets/images/class/emblem_blaster.png'
import demonic_image from '@/assets/images/class/emblem_demonic.png'
import destroyer_image from '@/assets/images/class/emblem_destroyer.png'
import devil_hunter_image from '@/assets/images/class/emblem_devil_hunter.png'
import devil_hunter_female_image from '@/assets/images/class/emblem_devil_hunter_female.png'
import elemental_master_image from '@/assets/images/class/emblem_elemental_master.png'
import force_master_image from '@/assets/images/class/emblem_force_master.png'
import hawk_eye_image from '@/assets/images/class/emblem_hawk_eye.png'
import holyknight_image from '@/assets/images/class/emblem_holyknight.png'
import infighter_image from '@/assets/images/class/emblem_infighter.png'
import lance_master_image from '@/assets/images/class/emblem_lance_master.png'
import reaper_image from '@/assets/images/class/emblem_reaper.png'
import scouter_image from '@/assets/images/class/emblem_scouter.png'
import soul_eater_image from '@/assets/images/class/emblem_soul_eater.png'
import summoner_image from '@/assets/images/class/emblem_summoner.png'
import warlord_image from '@/assets/images/class/emblem_warlord.png'
import weather_artist_image from '@/assets/images/class/emblem_weather_artist.png'
import yinyangshi_image from '@/assets/images/class/emblem_yinyangshi.png'
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
      {...props}
    />
  )
}

export default CharacterClassIcon

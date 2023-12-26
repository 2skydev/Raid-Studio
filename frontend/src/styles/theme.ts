import { Config } from 'tailwindcss'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '@/../tailwind.config'

interface CustomConfig extends Config {
  theme: {
    extend: {
      height: {
        headerHeight: string
        mainHeight: string
      }
      zIndex: {
        scrollbar: string
        pageProgressBar: string
        header: string
      }
    }
  }
}

export const { theme } = resolveConfig<CustomConfig>(tailwindConfig as CustomConfig)

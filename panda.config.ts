import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

const globalCss = defineGlobalStyles({
  body: {
    fontFamily: 'pretendard',
  },
})

export default defineConfig({
  presets: ['@shadow-panda/preset'],
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',

  globalCss,

  theme: {
    extend: {
      tokens: {
        fonts: {
          pretendard: {
            value: 'var(--fonts-pretendard)',
            description: 'Pretendard font',
          },
          aquatico: {
            value: 'var(--fonts-aquatico)',
            description: 'Aquatico font',
          },
        },
      },
      semanticTokens: {
        sizes: {
          headerHeight: {
            value: '{sizes.14}',
            description: 'Layout header height',
          },
          mainHeight: {
            value: 'calc(100vh - {sizes.14} - 1px)',
            description: 'sizes.headerHeight - 100vh',
          },
        },
        zIndex: {
          scrollbar: {
            value: '100',
            description: 'Scrollbar z-index',
          },
          pageProgressBar: {
            value: '99',
            description: 'Page loading progress bar z-index',
          },
          header: {
            value: '50',
            description: 'Header z-index',
          },
        },
      },
      keyframes: {
        backgroundAnimation: {
          '0%': {
            transform: 'translateY(100%) rotate(-50deg)',
          },
          '100%': {
            transform: 'translateY(calc(-100vh + -100%)) rotate(20deg)',
          },
        },
      },
    },
  },

  staticCss: {
    recipes: {
      // Load toast variant styles since it cannot be statically analyzed
      toast: [{ variant: ['*'] }],
    },
  },
})

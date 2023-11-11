import { styled } from '@styled-system/jsx'

export const Root = styled('div', {
  base: {
    position: 'fixed',
    overflow: 'hidden',
    w: '100vw',
    h: '100vh',
    top: 0,
    zIndex: 0,
    display: 'flex',
    justifyContent: 'space-around',

    // _before: {
    //   content: '""',
    //   position: 'absolute',
    //   zIndex: 1,
    //   top: 0,
    //   left: 0,
    //   w: '100%',
    //   height: '60vh',
    //   backgroundImage: `linear-gradient(-180deg, token(colors.background) 0%, rgba(255,255,255,0.00) 100%)`,
    // },

    _after: {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
      w: '100%',
      height: '20vh',
      backgroundImage: `linear-gradient(0deg, token(colors.background) 0%, rgba(235,235,235,0.00) 100%)`,
    },

    '& > div': {
      width: '1em',
      height: '1em',
      background: 'muted.foreground',
      alignSelf: 'flex-end',
      transform: 'translateY(100%)',
      animation: 'backgroundAnimation 9.5s linear infinite',
    },

    '& > div:nth-child(2)': {
      height: '1.5em',
      width: '3em',
      animationDelay: '1s',
      animationDuration: '17s',
      filter: 'blur(5px)',
    },
    '& > div:nth-child(3)': {
      height: '2em',
      width: '1em',
      animationDelay: '1.5s',
      animationDuration: '8s',
      filter: 'blur()',
    },
    '& > div:nth-child(4)': {
      height: '1em',
      width: '1.5em',
      animationDelay: '0.5s',
      animationDuration: '13s',
      filter: 'blur(3px)',
    },
    '& > div:nth-child(5)': {
      height: '1.25em',
      width: '2em',
      animationDelay: '4s',
      animationDuration: '11s',
      filter: 'blur(2px)',
    },
    '& > div:nth-child(6)': {
      height: '2.5em',
      width: '2em',
      animationDelay: '2s',
      animationDuration: '9s',
      filter: 'blur(1px)',
    },
    '& > div:nth-child(7)': {
      height: '5em',
      width: '2em',
      animationDuration: '12s',
      filter: 'blur(2.5px)',
    },
    '& > div:nth-child(8)': {
      height: '1em',
      width: '3em',
      animationDelay: '5s',
      animationDuration: '18s',
      filter: 'blur(6px)',
    },
    '& > div:nth-child(9)': {
      height: '1.5em',
      width: '2em',
      animationDuration: '9s',
      filter: 'blur(0.5px)',
    },
    '& > div:nth-child(10)': {
      height: '3em',
      width: '2.4em',
      animationDelay: '6s',
      animationDuration: '12s',
      filter: 'blur(0.5px)',
    },
  },
})

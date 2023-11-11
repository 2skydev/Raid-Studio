import { Router } from 'oak'

import { lostarkRouter } from './lostark.ts'
import { squadsRouter } from './squads.ts'

const router = new Router()
  .use(
    '/lostark',
    lostarkRouter.routes(),
    lostarkRouter.allowedMethods(),
  )
  .use(
    '/squads',
    squadsRouter.routes(),
    squadsRouter.allowedMethods(),
  )

export const routes = new Router().use('/apis', router.routes()).routes()

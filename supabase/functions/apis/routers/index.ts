import { Router } from 'oak'

import { lostarkRouter } from './lostark.ts'

const router = new Router()
  .use(
    '/lostark',
    lostarkRouter.routes(),
    lostarkRouter.allowedMethods(),
  )

export const routes = new Router().use('/apis', router.routes()).routes()

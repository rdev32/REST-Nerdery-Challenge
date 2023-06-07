import { Router } from 'express'
import documentation from './docs.router'
import accountsRouter from './accounts.router'
import postsRouter from './posts.router'
import commentsRouter from './comments.router'

const routes = Router()

routes.use('/api/v1', documentation)
routes.use('/api/v1', accountsRouter)
routes.use('/api/v1', postsRouter)
routes.use('/api/v1', commentsRouter)

export default routes

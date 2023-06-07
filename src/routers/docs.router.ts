import { Router } from 'express'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { JsonObject, serve, setup } from 'swagger-ui-express'

const content = load(readFileSync(process.cwd() + '/docs/docs.yaml', 'utf-8')) as JsonObject

const router = Router()

router.use('/docs/', serve, setup(content))

export default router

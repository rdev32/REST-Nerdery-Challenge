import express, { type Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import 'dotenv/config'

import documentation from './routers/docs.router'
import accountsRouter from './routers/accounts.router'
import postsRouter from './routers/posts.router'
import commentsRouter from './routers/comments.router'

const app: Application = express()

app.set('port', process.env.NODE_PORT || 3001)
app.set('env', process.env.NODE_ENV || 'dev')
app.disable('x-powered-by')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', documentation)
app.use('/api/v1', accountsRouter)
app.use('/api/v1', postsRouter)
app.use('/api/v1', commentsRouter)

export default app

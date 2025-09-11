import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import setupRouter from './routes/setupRoutes.js'

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morgan('dev'))
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}))
const port = process.env.PORT;

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/setup', setupRouter);

app.listen(port, () => {
  console.log(`App is up and listening on port ${port}!`)
})
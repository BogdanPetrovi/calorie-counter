import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet'
import 'dotenv/config'
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

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

app.listen(port, () => {
  console.log(`App is up and listening on port ${port}!`)
})
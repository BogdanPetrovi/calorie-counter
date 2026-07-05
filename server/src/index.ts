import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import setupRouter from './routes/setupRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import globalErrorHandler from './utils/globalErrorHandler.js';

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

app.use('/api/v1/dashboard', dashboardRoutes);

app.use('/api/v1/history', historyRoutes);

app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`App is up and listening on port ${port}!`)
})
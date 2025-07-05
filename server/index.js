import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet'
import 'dotenv/config'
import authRouter from './routes/authRoutes.js';

const app = express();
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: process.env.ORIGIN
}))
const port = process.env.PORT;

app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
  console.log(`App is up and listening on port ${port}!`)
})
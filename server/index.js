import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet'
import 'dotenv/config'

const app = express();
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: process.env.ORIGIN
}))
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is up and listening on port ${port}!`)
})
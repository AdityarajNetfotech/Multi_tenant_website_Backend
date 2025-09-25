import express from 'express'
import cors from 'cors'
import session from 'express-session'
import messageRouter from './routes/messageroutes.js'

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type","Authorization"]
}))


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}))

app.use(express.json());
app.use('/api/message', messageRouter);

export default app;



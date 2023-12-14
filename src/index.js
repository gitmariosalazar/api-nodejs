import express from 'express';
import passport from 'passport';
import './middlewares/microsoft.js';
import {router} from './routes/routes.js'
import cors from 'cors'

const app = express();
app.use(cors());

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize())

//Routes
app.get('/', (req, res) => {
    res.send("Hello World! Mario Salazar")
})
app.use('/auth', router)

app.listen(3000)
console.log('Hello, server on port 3000')
import express from 'express';
import passport from 'passport';
import './middlewares/microsoft.js';
import {router} from './routes/routes.js'

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize())

//Routes
app.get('/', (req, res) => {
    res.send("Hello World!")
})
app.use('/auth', router)

app.listen(4000)
console.log('Hello, server on port 3000')
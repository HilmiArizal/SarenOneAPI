const PORT = process.env.PORT || 8000;
const connection = require('./src/Database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotEnv = require('dotenv');
dotEnv.config({path: 'config.env'});

// DATABASE CONNECTION
connection();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



app.get('/', (req, res) => {
    res.send(`SERVER RUNNING IN PORT ${PORT}`);
});

const { ProductRouter, AuthRouter, UserRouter, TeamRouter } = require('./src/Routers');
app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/product', ProductRouter);
app.use('/team', TeamRouter);


app.listen(PORT, () => { console.log(`SERVER RUNNING IN PORT ${PORT}`) });
const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 4000;
const DBconnect = require('./config/DBconnect');
const userRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandle');
const morgan = require("morgan")
DBconnect();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

app.use('/api/users', userRouter);
app.use('/api/product', productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
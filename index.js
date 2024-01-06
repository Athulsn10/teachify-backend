require('dotenv').config()
const courseRoutes = require('./Routes/router');
const userRoutes = require('./Routes/userRouter');
const express = require('express')
const cors = require('cors')
require('./DB/connection')
const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/data', courseRoutes);
app.use('/api/user', userRoutes)

const PORT = 3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server Running Started at port: ${PORT} and waiting for requests`);
})

app.get('/',(req,res)=>{
    res.status(200).send(`<h1> Server Stated</h1>`)
})
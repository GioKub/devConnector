const express = require('express')
const app = express()
const connectDB = require('./config/db.js')

connectDB()

//this allows us to access req.body
app.use(express.json({extended: false}))

app.get('/', (req,res)=>{
    res.send("server is running")
})

//Define router
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.port || 5000

app.listen(PORT, ()=>{
    console.log(`server listeninng on ${PORT}`)
})
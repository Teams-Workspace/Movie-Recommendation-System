require('dotenv').config()
const express = require('express')
const DB = require('./config/DBconfig')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const likeRoutes = require('./routes/like')
const watchlistRoutes = require('./routes/watchlist')

const app = express()
const PORT = process.env.PORT 

DB();

const corsOptions = {
  origin: 'https://mrsapp.netlify.app',
}

app.use(cors(corsOptions))


app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello World')     
})

app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/watchlist', watchlistRoutes);


app.listen(PORT, ()=>{
    console.log(`Server running =>  ${PORT}`)
})

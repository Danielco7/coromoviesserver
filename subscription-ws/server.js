const express = require('express')
const cors = require('cors')
const memberrouts = require('./routes/members')
const movierouts = require('./routes/movie')
const subsrouts = require('./routes/subs')

const connectDBs = require('./config/dataabase');
const db1 = mongoClient.db("Cluster0");

const app = express();

app.use(cors());

app.use(express.json());


connectDBs();

app.use('/api/Members',memberrouts)
app.use('/api/Movies',movierouts)
app.use('/api/Subs',subsrouts)

app.listen(3001, console.log('server is running on port 8000'))
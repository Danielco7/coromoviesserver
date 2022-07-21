const express = require('express')
const cors = require('cors')
const usersrouts = require('./routes/users')
const memberrouts = require('./routes/members')
const movierouts = require('./routes/movie')
const subsrouts = require('./routes/subs')
const path = require('path');

const connectDBu = require('./config/database_users');
// const connectDBs = require('./config/dataabase');
const { db } = require('./models/usersmodels')

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

// connectDBs()
connectDBu();

app.use('/api/Users/',usersrouts)
app.use('/api/Members',memberrouts)
app.use('/api/Movies',movierouts)
app.use('/api/Subs',subsrouts)

const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

if(process.env.NODE_ENV ==='production') {
app.use(express.static('client/build'))

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// const port = process.env.PORT || 3030;
// app.get('/index', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/public/', 'index.html'))
//   })
// app.listen(port, () => {
//  console.log(`App listening on port ${port}!`)
// });

// app.listen(8000, console.log('server is running on port 8001'))
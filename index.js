require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const PORT = process.env.PORT || 8081;

const db = require('./connect');

app.get('/', async (req, res) => {
  const username = req.query.username || 'bollatialfredo';
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos` 
    );
    const repos = result.data
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count
      }))
      .sort((a, b) => b.stars - a.stars);

    res.send(repos);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/users', db.getUsers)

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

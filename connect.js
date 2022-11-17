//redis

const redis = require('redis');

const client = redis.createClient({url: process.env.REDISS_HOST});
client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', (msg) => console.log('Redis Client Connected', msg));

const connect = async ()=>{
  try {
    await client.connect();
  } catch (error) {
    console.error(error);    
  }
  await getString();
  await getList();
}

const getString = async ()=>{
  try {
    const value = await client.get('text');
    console.log(value);
  } catch (error) {
    console.log(error);
  }
}

const getList = async ()=>{
  try {
    const value = await client.lRange('test', 0, 1);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
}
//connect();

//postgres
const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: true
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers
}
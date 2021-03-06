const {DATABASE_URL} = require('../config.js');
const {Client} = require('pg');

module.exports = function createClient () {
  
  // console.log('База', DATABASE_URL);
  try{
    return new Client({
      connectionString: DATABASE_URL,
      ssl: {sslmode: 'require',
        rejectUnauthorized: false
      }
    })
  }
  catch (e) {
    console.log('Ошибка в dbConnection.js', e);
  }
};
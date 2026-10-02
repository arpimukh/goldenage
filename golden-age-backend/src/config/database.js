// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'golden_age_db',
//   process.env.DB_USER || '2REHBTxGTdm5vAi.root',
//   process.env.DB_PASS || 'wvGrPbZdVoddyQ74',
//   {
//     host: process.env.DB_HOST || 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
//     dialect: 'mysql',
//     logging: false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     },
//     ssl: {
//     path_to_ca: process.env.CA || './CA.pem'
//     //ca: fs.readFileSync(process.env.CA || './CA.pem').toString()
//   }
  
// const pool = mysql.createPool(dbConfig)

// const initializeDatabase = async () => {
//   try {
//     const connection = await pool.getConnection()
//     //connection.setOptions({ ATTR_EMULATE_PREPARES : true })
//     console.log('Connected to MySQL successfully')
//     console.log('Using database:', dbConfig.database)
//   } catch (error) {
//     console.error('Error connecting to MySQL:', error)
//   }
// }}

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER ,
  process.env.DB_PASS ,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(process.env.CA || './CA.pem').toString()
      }
    }
  }
);

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL via Sequelize successfully.');
    console.log('Using database:', process.env.DB_NAME);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeDatabase();

module.exports = sequelize;

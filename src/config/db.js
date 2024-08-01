const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.PG_CONFIG);

module.exports = pool;

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    PG_CONFIG: {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT || 5432,
    }
};

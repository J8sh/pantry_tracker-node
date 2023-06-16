module.exports = {
    port: process.env.PORT || 3001,
    db: {
        database: process.env.DB_NAME || 'pantry_tracker',
        user: process.env.DB_USER || 'josh',
        password: process.env.DB_PASS || 'josh',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'localhost',
            storage: './pantry_tracker.sql'
        }
    }
}

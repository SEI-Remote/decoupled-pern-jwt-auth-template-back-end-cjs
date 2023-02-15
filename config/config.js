require('dotenv').config()

const options = { ssl: { rejectUnauthorized: false, require: true } }

module.exports = {
  development: {
    dialect: 'postgres',
    dialectOptions: options,
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    dialect: 'postgres',
    dialectOptions: options,
    use_env_variable: 'DATABASE_URL',
  },
  production: {
    dialect: 'postgres',
    dialectOptions: options,
    use_env_variable: 'DATABASE_URL',
  },
}

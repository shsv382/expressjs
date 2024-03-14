const { Sequelize } = require('sequelize');
const { config } = require('dotenv');

config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Соединение с БД было успешно установлено')
    }).catch(e => {
        console.log('Невозможно выполнить подключение к БД: ', e)
    })

module.exports = sequelize
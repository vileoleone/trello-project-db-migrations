const path = require('path')
const args = require('./args')
const dbMigrate = require('db-migrate')
const isModule = true
const {up, down, add, create, user, host, port, driver, password, database} = args()
const {DB_USER, DB_HOST, DB_PORT, DB_DRIVER, DB_PASS, DB_NAME} = process.env
const config = {
  env: 'local',
  cwd: __dirname,

  config: {
    local: {
      user: user || DB_USER,
      host: host || DB_HOST,
      port: port || DB_PORT,
      driver: driver || DB_DRIVER,
      password: password || DB_PASS,
      database: database || DB_NAME
    }
  }
}

const migrator = dbMigrate.getInstance(isModule, config)

if (up === true) migrator.up()
if (down === true) migrator.down()
if (up && up !== true) migrator.up(Number(up))
if (down && down !== true) migrator.down(Number(down))
if (add) migrator.create(add)

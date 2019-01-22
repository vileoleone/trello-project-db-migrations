const args = require('./args')
const dbMigrate = require('db-migrate')
const isModule = true
const { up, down, add } = args()

const config = {
  env: 'local',
  cwd: __dirname
}

const { DATABASE_URL } = process.env
const dbName = DATABASE_URL.substr(DATABASE_URL.lastIndexOf('/') + 1)

process.env.DATABASE_URL = DATABASE_URL.substr(0, DATABASE_URL.lastIndexOf('/'))

dbMigrate.getInstance(isModule, config).createDatabase(dbName, () => {
  process.env.DATABASE_URL = DATABASE_URL
  const migrator = dbMigrate.getInstance(isModule, config)
  if (up === true) migrator.up()
  if (down === true) migrator.down()
  if (up && up !== true) migrator.up(Number(up))
  if (down && down !== true) migrator.down(Number(down))
  if (add) migrator.create(add)
})

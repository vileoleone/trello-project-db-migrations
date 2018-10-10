const args = require('./args')
const dbMigrate = require('db-migrate')
const isModule = true
const { up, down, add } = args()

const config = {
  env: 'local',
  cwd: __dirname
}

const migrator = dbMigrate.getInstance(isModule, config)

if (up === true) migrator.up()
if (down === true) migrator.down()
if (up && up !== true) migrator.up(Number(up))
if (down && down !== true) migrator.down(Number(down))
if (add) migrator.create(add)

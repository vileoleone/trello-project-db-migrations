const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = (db) => db.addColumn('extensions', 'permission', { type: STRING, length: 128 })
exports.down = (db) => db.removeColumn('extensions', 'permission')

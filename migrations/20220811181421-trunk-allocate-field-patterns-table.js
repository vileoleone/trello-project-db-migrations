const { dataType } = require('db-migrate-shared')
const { DECIMAL } = dataType

exports.up = async (db) => {
  await db.addColumn('patterns', 'trunk_allocate', { type: DECIMAL })
}

exports.down = async (db) => {
  await db.removeColumn('patterns', 'trunk_allocate')
}

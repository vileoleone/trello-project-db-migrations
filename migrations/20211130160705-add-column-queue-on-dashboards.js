const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('dashboards', 'queue_id', { type: STRING, length: 128 })
}

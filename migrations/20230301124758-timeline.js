const { dataType } = require('db-migrate-shared')
const {INTEGER, DATE_TIME} = dataType


exports.up = async (db) => {


  await db.createTable('timeline', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    timestamp: { type: DATE_TIME, notNull: true },
    count_read_to_do: { type: INTEGER, defaulValue: 0, notNull: true },
    count_work_in_progress: { type: INTEGER, defaulValue: 0, notNull: true },
    count_ready_to_test: { type: INTEGER, defaulValue: 0, notNull: true },
    count_testing: { type: INTEGER, defaulValue: 0, notNull: true },
    count_waiting_deploy: { type: INTEGER, defaulValue: 0, notNull: true },
    count_done: { type: INTEGER, defaulValue: 0, notNull: true },
  }) 
}

exports.down = async function  (db) {
await db.dropTable('timeline')

}
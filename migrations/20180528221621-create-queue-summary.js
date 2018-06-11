const {dataType} = require('db-migrate-shared')
const {INTEGER, DATE_TIME, STRING} = dataType

exports.up = async (db) => {
  await db.createTable('queue_summary', {
    queue_id: {type: STRING, notNull: true, length: 128},
    period: {type: DATE_TIME, notNull: true},
    in_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    in_transferred: {type: INTEGER, notNull: true, defaultValue: 0},
    in_abandoned: {type: INTEGER, notNull: true, defaultValue: 0},
    in_completed_sla: {type: INTEGER, notNull: true, defaultValue: 0},
    in_abandoned_sla: {type: INTEGER, notNull: true, defaultValue: 0},

    out_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    out_transferred: {type: INTEGER, notNull: true, defaultValue: 0},
    out_discarded: {type: INTEGER, notNull: true, defaultValue: 0},

    auto_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_transferred: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_discarded: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_abandoned: {type: INTEGER, notNull: true, defaultValue: 0},

    in_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    out_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_call_secs: {type: INTEGER, notNull: true, defaultValue: 0},

    in_hold_secs_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    in_hold_secs_abandoned: {type: INTEGER, notNull: true, defaultValue: 0},

    out_try_secs_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    out_try_secs_discarded: {type: INTEGER, notNull: true, defaultValue: 0},

    auto_hold_secs_completed: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_hold_secs_abandoned: {type: INTEGER, notNull: true, defaultValue: 0},
    auto_try_secs_completed: {type: INTEGER, notNull: true, defaultValue: 0}
  })
  await db.runSql('ALTER TABLE queue_summary ADD CONSTRAINT pk_queue_summary PRIMARY KEY (queue_id, period)')
  await db.addForeignKey('queue_summary', 'queues', 'fk_queue_summary_queues', { queue_id: 'id' }, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
  await db.addIndex('queue_summary', 'index_queue_summary_queue_id', ['queue_id'])
}

exports.down = async (db) => {
  await db.dropTable('queue_summary')
}

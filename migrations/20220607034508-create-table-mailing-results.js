const { dataType } = require('db-migrate-shared')
const { BIGINT, DATE_TIME, STRING, BOOLEAN, SMALLINT } = dataType

exports.up = async (db) => {
  await db.createTable('mailing_results', {
    mailing_contact_id: { type: BIGINT, notNull: true },
    mailing_phone_id: { type: STRING, length: 128, notNull: true },
    call_id: { type: STRING, length: 128, notNull: true },
    queue_id: { type: STRING, length: 128, notNull: true },

    dialed_at: { type: DATE_TIME, notNull: true },
    enqueued_at: { type: DATE_TIME },
    answered_at: { type: DATE_TIME },
    hangup_at: { type: DATE_TIME, notNull: true },

    exported_at: { type: DATE_TIME },
    exported: { type: BOOLEAN, notNull: true, defaultValue: false },

    will_retry: { type: BOOLEAN, notNull: true, defaultValue: false },
    hangup_cause_id: { type: SMALLINT }
  })

  await db.addIndex('mailing_results', 'idx_mailing_results_queue', ['queue_id'])
  await db.addIndex('mailing_results', 'idx_mailing_results_exported', ['exported'])
  await db.addIndex('mailing_results', 'idx_mailing_results_contact', ['mailing_contact_id'])
}

exports.down = (db) => (
  db.dropTable('mailing_results')
)

const { dataType } = require('db-migrate-shared')
const { INTEGER, STRING, BIGINT, DATE_TIME, CHAR, TEXT } = dataType

const recordingIdType = { type: BIGINT }
const ccUserType = { type: CHAR, length: 36 }
const callIdType = { type: STRING, length: 128 }
const pkProps = { notNull: true, primaryKey: true }

exports.up = async (db) => {
  await db.createTable('cc_recordings_packages', {
    id: { ...recordingIdType, ...pkProps, autoIncrement: true },
    name: { type: STRING, length: 256, notNull: true },
    status: { type: 'ENUM', length: "'NOT_CONFIRMED', 'PREPARING', 'AVAILABLE', 'EXPIRED'", notNull: true },
    cc_user_id: { ...ccUserType, null: false },
    access_control: { type: 'ENUM', length: "'OWNER_ONLY', 'PUBLIC'", notNull: true },
    calls: { type: INTEGER, notNull: true },
    talk_secs: { type: INTEGER, notNull: true },
    size: { type: INTEGER, notNull: true },
    params: { type: TEXT },
    created_at: { type: DATE_TIME, notNull: true },
    available_at: { type: DATE_TIME },
    expired_at: { type: DATE_TIME }
  })

  await db.createTable('cc_recordings_packages_calls', {
    recordings_package_id: { ...recordingIdType, notNull: true },
    call_id: { ...callIdType, notNull: true },
    status: { type: 'ENUM', length: "'PENDING', 'AVAILABLE', 'EXPIRED'", notNull: true },
    restored_at: { type: DATE_TIME }
  }).then(() => db.runSql('ALTER TABLE cc_recordings_packages_calls ADD CONSTRAINT pk_cc_recordings_packages_calls PRIMARY KEY (recordings_package_id, call_Id)'))

  await db.addForeignKey('cc_recordings_packages', 'cc_users', 'fk_cc_recordings_packages_cc_users', { cc_user_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('cc_recordings_packages', 'cc_recordings_packages_user_id', ['cc_user_id'])

  await db.addForeignKey('cc_recordings_packages_calls', 'cc_recordings_packages', 'fk_cc_recordings_packages_calls_cc_recordings_packages', { recordings_package_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('cc_recordings_packages_calls', 'cc_recordings_packages_calls_recordings_package_id', ['recordings_package_id'])

  await db.addForeignKey('cc_recordings_packages_calls', 'calls', 'fk_cc_recordings_packages_calls_calls', { call_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('cc_recordings_packages_calls', 'cc_recordings_packages_calls_call_id', ['call_id'])
}

exports.down = async (db) => {
  await db.dropTable('cc_recordings_packages_calls')
  await db.dropTable('cc_recordings_packages')
}

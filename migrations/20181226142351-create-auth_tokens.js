const { dataType } = require('db-migrate-shared')
const { STRING, BIGINT, DATE_TIME, TEXT } = dataType

const roleIdType = { type: BIGINT, notNull: true }
const applicationIdType = { type: STRING, length: 128, notNull: true }
const authTokenIdType = { type: BIGINT, notNull: true }

exports.up = async (db) => {
  await db.createTable('roles', {
    id: { ...roleIdType, primaryKey: true, autoIncrement: true },
    name: { type: STRING, length: 256, notNull: true },
    permissions: { type: TEXT, notNull: true },
    created_at: { type: DATE_TIME, notNull: true },
    updated_at: { type: DATE_TIME }
  })

  await db.runSql(`INSERT INTO roles (name, permissions, created_at) VALUES ('master', '${JSON.stringify({ resources: [{ method: '*', path: '/*' }] })}', NOW())`)
  await db.runSql(`INSERT INTO roles (name, permissions, created_at) VALUES ('handler-events', '${JSON.stringify({ resources: [{ method: 'GET', path: '/events/latest' }] })}', NOW())`)

  await db.createTable('applications', {
    id: { ...applicationIdType, primaryKey: true },
    name: { type: STRING, length: 256, notNull: true },
    active: { type: 'TINYINT', length: 1, defaultValue: 1 },
    created_at: { type: DATE_TIME, notNull: true },
    updated_at: { type: DATE_TIME }
  })

  await db.addIndex('applications', 'applications_active', ['active'])

  await db.runSql("INSERT INTO applications (id, name, created_at) VALUES ('support-staff', 'support-staff', NOW())")
  await db.runSql("INSERT INTO applications (id, name, created_at) VALUES ('handler-events', 'handler-events', NOW())")
  await db.runSql("INSERT INTO applications (id, name, created_at) VALUES ('dialer', 'dialer', NOW())")
  await db.runSql("INSERT INTO applications (id, name, created_at) VALUES ('cc', 'cc', NOW())")

  await db.createTable('auth_tokens', {
    id: { ...authTokenIdType, primaryKey: true, autoIncrement: true },
    application_id: { ...applicationIdType },
    role_id: { ...roleIdType },
    uuid: { type: STRING, length: 36, notNull: true },
    hash: { type: STRING, length: 512, notNull: true },
    salt: { type: STRING, length: 36, notNull: true },
    last_auth_at: { type: DATE_TIME },
    disabled_at: { type: DATE_TIME },
    created_at: { type: DATE_TIME, notNull: true }
  })

  await db.addForeignKey('auth_tokens', 'applications', 'fk_auth_tokens_applications', { application_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('auth_tokens', 'auth_tokens_application_id', ['application_id'])

  await db.addForeignKey('auth_tokens', 'roles', 'fk_auth_tokens_roles', { role_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('auth_tokens', 'auth_tokens_role_id', ['role_id'])

  await db.addIndex('auth_tokens', 'unique_auth_tokens_uuid', ['uuid'], true)
}

exports.down = async (db) => {
  await db.dropTable('auth_tokens')
  await db.dropTable('applications')
  await db.dropTable('roles')
}

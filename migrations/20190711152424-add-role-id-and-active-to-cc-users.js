const { dataType } = require('db-migrate-shared')
const { BIGINT } = dataType

exports.up = async (db) => {
  await db.addColumn('cc_users', 'active', { type: 'TINYINT', length: 1, defaultValue: 1, notNull: true })
  await db.addColumn('cc_users', 'role_id', { type: BIGINT })
  await db.runSql(`
    INSERT INTO roles
    (name, permissions, created_at)
    SELECT CONCAT('cc_user:', u.id), '{"resources":[{"method":"*","path":"/*"}]}', NOW()
    FROM cc_users AS u
  `)
  await db.runSql(`
    UPDATE cc_users
    set role_id = (SELECT r.id FROM roles AS r WHERE name = CONCAT('cc_user:', cc_users.id))
  `)
  await db.changeColumn('cc_users', 'role_id', { type: BIGINT, notNull: true })
  await db.addIndex('cc_users', 'cc_users_role_id', ['role_id'])
  await db.addForeignKey('cc_users', 'roles', 'fk_cc_users_roles', { role_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.removeForeignKey('cc_users', 'fk_cc_users_roles')
  await db.runSql(`
    DELETE FROM roles
    WHERE id IN (SELECT role_id FROM cc_users)
  `)
  await db.removeIndex('cc_users', 'cc_users_role_id')
  await db.removeColumn('cc_users', 'role_id')
  await db.removeColumn('cc_users', 'active')
}

const { dataType } = require('db-migrate-shared')
const { INTEGER, CHAR } = dataType

exports.up = (db) => db.dropTable('extension_dial_permissions')

exports.down = async (db) => {
  const extensionIdType = { type: CHAR, length: 12 }
  const callTypeIdType = { type: INTEGER }

  await db.createTable('extension_dial_permissions', {
    extension_id: { ...extensionIdType, notNull: true },
    call_type_id: { ...callTypeIdType, notNull: true }
  })

  await db.runSql('ALTER TABLE extension_dial_permissions ADD CONSTRAINT pk_extension_dial_permissions PRIMARY KEY (extension_id, call_type_id)')

  await db.addForeignKey('extension_dial_permissions', 'extensions', 'fk_extension_dial_permissions_extensions', { extension_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('extension_dial_permissions', 'index_extension_dial_permissions_extensions', ['extension_id'])

  await db.addForeignKey('extension_dial_permissions', 'call_types', 'fk_extension_dial_permissions_call_types', { call_type_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('extension_dial_permissions', 'index_extension_dial_permissions_call_types', ['call_type_id'])
}

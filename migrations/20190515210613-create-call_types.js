const { dataType } = require('db-migrate-shared')
const { STRING, INTEGER } = dataType

const agentIdType = { type: INTEGER }
const callTypeIdType = { type: INTEGER }

exports.up = async (db) => {
  await db.createTable('call_types', {
    id: { ...callTypeIdType, notNull: true, primaryKey: true, autoIncrement: true },
    name: { type: STRING, notNull: true }
  })

  const callTypes = [
    { id: 1, name: 'LDI' },
    { id: 2, name: 'LDN Cod. Especial' },
    { id: 3, name: 'LDN Fixo' },
    { id: 4, name: 'VC2' },
    { id: 5, name: 'VC3' },
    { id: 6, name: 'Local Cod. Especial' },
    { id: 7, name: 'Local' },
    { id: 8, name: 'VC1' },
    { id: 9, name: 'Nao Geografico Gratuito' },
    { id: 10, name: 'Nao Geografico Tarifado' }
  ]

  await Promise.all(callTypes.map(({ id, name }) => db.runSql(`INSERT INTO call_types (id, name) VALUES (${id}, '${name}')`)))

  await db.addForeignKey('calls', 'call_types', 'fk_calls_call_types', { call_type_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('calls', 'index_calls_call_types', ['call_type_id'])

  await db.createTable('agent_dial_permissions', {
    agent_id: { ...agentIdType, notNull: true },
    call_type_id: { ...callTypeIdType, notNull: true },
    temporary: { type: 'TINYINT', length: 1, notNull: true }
  })
  await db.runSql('ALTER TABLE agent_dial_permissions ADD CONSTRAINT pk_agent_dial_permissions PRIMARY KEY (agent_id, call_type_id)')

  await db.addForeignKey('agent_dial_permissions', 'call_types', 'fk_agent_dial_permissions_call_types', { call_type_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('agent_dial_permissions', 'index_agent_dial_permissions_call_types', ['call_type_id'])
  await db.addForeignKey('agent_dial_permissions', 'agents', 'fk_agent_dial_permissions_agents', { agent_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('agent_dial_permissions', 'index_agent_dial_permissions_agents', ['agent_id'])
}

exports.down = async (db) => {
  await db.dropTable('agent_dial_permissions')
  await db.removeForeignKey('calls', 'fk_calls_call_types')
  await db.removeIndex('calls', 'index_calls_call_types')
  await db.dropTable('call_types')
}

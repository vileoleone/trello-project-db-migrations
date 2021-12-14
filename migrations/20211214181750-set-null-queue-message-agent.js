const message = 'Olá! meu nome ? $agent, Em que posso te ajudar?'

exports.up = async (db) => {
  const queryResult = await db.runSql("SELECT id, queue_id, value FROM queue_properties where name = 'welcome-message-agent'")
  const properties = queryResult.map(propertie => ({ ...propertie })).filter(propertie => !propertie.value)
  for (const propertie of properties) {
    await updatePropertie(db, propertie)
  }
}

const updatePropertie = async (db, propertie) => {
  await db.runSql('UPDATE queue_properties SET value = ? WHERE id = ?', [message, propertie.id])
}

exports.down = async (db) => (
  await db.runSql("DELETE FROM queue_properties WHERE name = 'welcome-message-agent'")
)

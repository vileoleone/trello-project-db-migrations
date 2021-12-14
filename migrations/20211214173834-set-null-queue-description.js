exports.up = async (db) => {
  const queryResult = await db.runSql("SELECT id, queue_id, value FROM queue_properties where name = 'description-chat-menu'")
  const properties = queryResult.map(propertie => ({ ...propertie })).filter(propertie => !propertie.value)
  for (const propertie of properties) {
    await updatePropertie(db, propertie)
  }
}

const updatePropertie = async (db, propertie) => {
  const queueQuery = await db.runSql('SELECT id, name FROM queues WHERE id = ?', [propertie.queue_id])
  const queuePropertie = queueQuery.map(propertie => ({ ...propertie }))
  if (queuePropertie.length) await db.runSql('UPDATE queue_properties SET value = ? WHERE id = ?', [queuePropertie[0].name, propertie.id])
}

exports.down = async (db) => (
  await db.runSql("DELETE FROM queue_properties WHERE name = 'description-chat-menu'")
)

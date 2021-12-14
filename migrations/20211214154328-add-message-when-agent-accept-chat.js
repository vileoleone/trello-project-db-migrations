const message = 'Olá! meu nome é $agent, Em que posso te ajudar?'

exports.up = async (db) => {
  const queryResult = await db.runSql('SELECT id FROM queues')
  const queues = queryResult.map(queue => ({ ...queue }))
  for (const queue of queues) {
    await updateQueue(db, queue)
  }
}

const updateQueue = async (db, queue) => {
  const descChatMenu = await db.runSql('select id from queue_properties where queue_id = ? and name = "welcome-message-agent" limit 1', [queue.id])
  const properties = descChatMenu.map(propertie => ({ ...propertie }))
  if (!properties.length) await db.runSql("INSERT INTO queue_properties (queue_id, name, value) VALUES (?, 'welcome-message-agent', ?)", [queue.id, message])
}

exports.down = async (db) => (
  await db.runSql("DELETE FROM queue_properties WHERE name = 'welcome-message-agent'")
)

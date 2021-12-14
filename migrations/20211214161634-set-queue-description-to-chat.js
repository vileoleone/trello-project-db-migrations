exports.up = async (db) => {
  const queryResult = await db.runSql('SELECT id, name FROM queues')
  const queues = queryResult.map(queue => ({ ...queue }))
  for (const queue of queues) {
    await updateQueue(db, queue)
  }
}

const updateQueue = async (db, queue) => {
  const descChatMenu = await db.runSql('select id from queue_properties where queue_id = ? and name = "description-chat-menu" limit 1', [queue.id])
  const properties = descChatMenu.map(propertie => ({ ...propertie }))
  if (!properties.length) await db.runSql("INSERT INTO queue_properties (queue_id, name, value) VALUES (?, 'description-chat-menu', ?)", [queue.id, queue.name])
}

exports.down = async (db) => (
  await db.runSql("DELETE FROM queue_properties WHERE name = 'description-chat-menu'")
)

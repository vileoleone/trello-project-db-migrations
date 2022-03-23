exports.up = async (db) => {
  const queryResult = await db.runSql('SELECT id FROM queues')
  const queues = queryResult.map(queue => ({ ...queue }))
  const hasQueue = queues.filter(queue => queue.id === 'filaexemplo')

  if (!hasQueue.length) await db.runSql('INSERT INTO queues (id, name, direction_in, direction_out, direction_auto, description, sla_secs, sla_percent, image_url, active) VALUES ("filaexemplo", "filaexemplo", 1, 1, 0, "filaexemplo", 15, 90, NULL, 1)')
}

exports.down = async (db) => (
  await db.runSql("DELETE FROM queues WHERE id = 'filaexemplo'")
)

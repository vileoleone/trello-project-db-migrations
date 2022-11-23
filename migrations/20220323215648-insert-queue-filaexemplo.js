exports.up = async (db) => {
  const queryResult = await db.runSql('SELECT id FROM queues')
  const queues = queryResult.map(queue => ({ ...queue }))
  const hasQueue = queues.filter(queue => queue.id === 'manual').length
  if (!hasQueue) await db.runSql('INSERT INTO queues (id, name, direction_in, direction_out, direction_auto, description, sla_secs, sla_percent, image_url, active) VALUES ("manual", "Manual", 1, 1, 0, "Fila Manual", 15, 90, NULL, 1)')
}

exports.down = async (db) => (
  db.runSql("DELETE FROM queues WHERE id = 'manual'")
)

exports.up = async (db) => {
  await db.runSql('UPDATE queue_properties SET value = ? WHERE name = ? AND (value = ? OR value = ?)', ['offline', 'leave-when-empty', 'strict', 'yes'])
  await db.runSql('DELETE FROM queue_properties WHERE name = ?', ['join-empty'])
}

exports.down = async (db) => {
  await db.runSql('UPDATE queue_properties SET value = ? WHERE name = ?', ['strict', 'leave-when-empty'])
  await db.runSql('INSERT INTO queue_properties (value, name) VALUES ("yes", "join-empty")')
}

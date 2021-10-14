exports.up = async (db) => {
  await db.runSql('UPDATE queue_properties SET value = ? WHERE name = ? AND value = ?', ['allowed', 'show-caller-id', 'Allowed'])
  await db.runSql('UPDATE queue_properties SET value = ? WHERE name = ? AND value = ?', ['prohib', 'show-caller-id', 'Prohib'])
}

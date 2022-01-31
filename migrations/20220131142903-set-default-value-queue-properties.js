exports.up = async (db) => {
  await db.runSql('INSERT INTO queue_properties (value, name) VALUES ("", "out-hours-attendance-message")')
  await db.runSql('INSERT INTO queue_properties (value, name) VALUES ("", "welcome-message-agent")')
  await db.runSql('INSERT INTO queue_properties (value, name) VALUES ("", "description-chat-menu")')
}

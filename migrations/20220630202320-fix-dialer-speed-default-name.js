exports.up = (db) => (
  db.runSql('UPDATE queue_properties SET name = ? WHERE name = ? AND queue_id IS NULL', ['dialer-speed', 'dial-speed'])
)

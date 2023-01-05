exports.up = async (db) => (
  db.runSql('UPDATE pending_settings SET object_pending = FALSE')
)

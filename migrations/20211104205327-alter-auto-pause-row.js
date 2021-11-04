exports.up = (db) => (
  db.runSql("UPDATE pause_reasons SET ID = 0 WHERE description LIKE 'Pausa por Rejei%'")
)

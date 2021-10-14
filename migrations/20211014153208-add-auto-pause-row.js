exports.up = (db) => (
  db.runSql('INSERT INTO pause_reasons (id, description, max_pause_secs) VALUES (0, ?, 0)', ['Pausa por Rejeição'])
)

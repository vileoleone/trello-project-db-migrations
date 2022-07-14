
exports.up = async (db) => {
  await db.runSql('ALTER TABLE mailing_results MODIFY COLUMN hangup_at DATETIME')
}

exports.down = async (db) => {
  await db.runSql('ALTER TABLE mailing_results MODIFY COLUMN hangup_at DATETIME NOT NULL')
}

exports.up = async (db) => {
  await db.changeColumn('cc_recordings_packages', 'status', { type: 'ENUM', length: "'PENDING', 'RESTORING', 'RESTORED', 'AVAILABLE', 'UNAVAILABLE'", notNull: true })
}

exports.down = async (db) => {
  await db.runSql("UPDATE cc_recordings_packages SET status = 'AVAILABLE' WHERE status = 'RESTORED'")
  await db.changeColumn('cc_recordings_packages', 'status', { type: 'ENUM', length: "'PENDING', 'RESTORING', 'AVAILABLE', 'UNAVAILABLE'", notNull: true })
}

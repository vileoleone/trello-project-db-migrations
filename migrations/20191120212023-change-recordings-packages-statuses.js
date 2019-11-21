exports.up = async (db) => {
  await Promise.all([
    db.changeColumn('cc_recordings_packages', 'status', { type: 'ENUM', length: "'NOT_CONFIRMED', 'PREPARING', 'AVAILABLE', 'EXPIRED', 'PENDING', 'RESTORING'", notNull: true }),
    db.changeColumn('cc_recordings_packages_calls', 'status', { type: 'ENUM', length: "'PENDING', 'AVAILABLE', 'EXPIRED'", notNull: true })
  ])
  await Promise.all([
    db.runSql("UPDATE cc_recordings_packages SET status = 'PENDING' WHERE status = 'NOT_CONFIRMED'"),
    db.runSql("UPDATE cc_recordings_packages SET status = 'RESTORING' WHERE status = 'PREPARING'"),
    db.runSql("UPDATE cc_recordings_packages SET status = 'AVAILABLE' WHERE status = 'EXPIRED'"),
    db.runSql("UPDATE cc_recordings_packages_calls SET status = 'AVAILABLE' WHERE status = 'EXPIRED'")
  ])
  await Promise.all([
    db.changeColumn('cc_recordings_packages', 'status', { type: 'ENUM', length: "'PENDING', 'RESTORING', 'AVAILABLE', 'UNAVAILABLE'", notNull: true }),
    db.changeColumn('cc_recordings_packages_calls', 'status', { type: 'ENUM', length: "'PENDING', 'RESTORING', 'AVAILABLE'", notNull: true })
  ])
}

exports.down = async (db) => {
  await Promise.all([
    db.changeColumn('cc_recordings_packages', 'status', { type: 'ENUM', length: "'NOT_CONFIRMED', 'PREPARING', 'AVAILABLE', 'EXPIRED', 'PENDING', 'RESTORING'", notNull: true }),
    db.changeColumn('cc_recordings_packages_calls', 'status', { type: 'ENUM', length: "'PENDING', 'AVAILABLE', 'EXPIRED'", notNull: true })
  ])
  await Promise.all([
    db.runSql("UPDATE cc_recordings_packages SET status = 'NOT_CONFIRMED' WHERE status = 'PENDING'"),
    db.runSql("UPDATE cc_recordings_packages SET status = 'PREPARING' WHERE status = 'RESTORING'")
  ])
  await Promise.all([
    db.changeColumn('cc_recordings_packages', 'status', { type: 'ENUM', length: "'NOT_CONFIRMED', 'PREPARING', 'AVAILABLE', 'EXPIRED'", notNull: true }),
    db.changeColumn('cc_recordings_packages_calls', 'status', { type: 'ENUM', length: "'PENDING','AVAILABLE','EXPIRED'", notNull: true })
  ])
}

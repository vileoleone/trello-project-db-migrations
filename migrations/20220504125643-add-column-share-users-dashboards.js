exports.up = async (db) => {
  await db.addColumn('dashboards', 'share_users', { type: 'MEDIUMTEXT' })
}

exports.down = async (db) => {
  await db.removeColumn('dashboards', 'share_users')
}

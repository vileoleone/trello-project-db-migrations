exports.up = async (db) => {
  const rows = await db.runSql('SELECT id, config FROM call_types')
  const routes = await db.runSql('SELECT id, call_type_id, format FROM routes WHERE is_default = 1 AND active = 1')

  const callTypes = rows.reduce((acc, row) => {
    acc[row.id] = JSON.parse(row.config).FORMAT
    return acc
  }, {})

  for (const route of routes) {
    const mask = callTypes[route.call_type_id].mask
    if (route.format === mask) continue
    await db.runSql('UPDATE routes SET format = ? WHERE id = ?', [mask, route.id])
  }
}

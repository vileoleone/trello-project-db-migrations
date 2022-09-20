exports.up = async (db) => {
  const routes = await db.runSql(`
    SELECT id, lcr_profile_id, call_type_id, format
    FROM routes
    WHERE active = 1
      AND is_default = 1
      AND deleted_at IS NULL
    ORDER BY call_type_id, order_router
  `)

  const profiles = {}

  for (const route of routes) {
    const callTypeId = route.call_type_id
    const lcrProfileId = route.lcr_profile_id

    if (!profiles[lcrProfileId]) profiles[lcrProfileId] = {}

    let orderRouter = profiles[lcrProfileId][callTypeId] ?? -1
    profiles[lcrProfileId][callTypeId] = ++orderRouter

    const format = formats[callTypeId][orderRouter]
    console.log(lcrProfileId, route.id, callTypeId, orderRouter, format)
    if (route.format === format) continue

    if (format) {
      await db.runSql('UPDATE routes SET format = ? WHERE id = ?', [format, route.id])
      continue
    }

    await db.runSql('DELETE FROM patterns WHERE route_id = ?', [route.id])
    await db.runSql('DELETE FROM routes WHERE id = ?', [route.id])
  }
}

const formats = {
  1: ['XX'],
  2: ['XX', 'XXX', 'XXXX'],
  3: ['[2-5]XXXXXXX'],
  4: ['XXXXXXXX'],
  5: ['XXXXXXXX'],
  6: ['XX', 'XXX', 'XXXX'],
  7: ['[2-6]XXXXXXX'],
  8: ['XXXXXXXX'],
  9: ['XXXXXX', 'XXXXXXX'],
  10: ['[3,5]00XXXXXX', '[3,5]00XXXXXXX']
}

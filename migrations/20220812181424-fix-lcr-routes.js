exports.up = async (db) => {
  const routes = await db.runSql('SELECT id, call_type_id, format, order_router FROM routes WHERE is_default = 1 AND active = 1')

  for (const route of routes) {
    const format = formats[route.call_type_id][Number(route.order_router)]
    if (route.format === format) continue
    await db.runSql('UPDATE routes SET format = ? WHERE id = ?', [format, route.id])
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
  10: ['300XXXXXX', '300XXXXXXX', '800XXXXXX', '800XXXXXXX']
}

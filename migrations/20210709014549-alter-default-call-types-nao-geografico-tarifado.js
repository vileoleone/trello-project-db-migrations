exports.up = async (db) => {
  const format = '{"FORMAT":{"mask":"[3,5]00XXXXXXX","prefix":"0","label":"0[3,5]00XXXXXXX"},"DDD":{"disable":true,"default":["XX"]}}'
  await db.runSql(`UPDATE call_types SET config = '${format}' WHERE id = 10`)
  await db.runSql("UPDATE routes SET format = '500XXXXXX' WHERE id = 17")
  await db.runSql("UPDATE routes SET format = '500XXXXXXX' WHERE id = 18")
}

exports.down = async (db) => {
  const format = '{"FORMAT":{"mask":"[3,8]00XXXXXXX","prefix":"0","label":"0[3,8]00XXXXXXX"},"DDD":{"disable":true,"default":["XX"]}}'
  await db.runSql(`UPDATE call_types SET config = '${format}' WHERE id = 10`)
  await db.runSql("UPDATE routes SET format = '800XXXXXX' WHERE id = 17")
  await db.runSql("UPDATE routes SET format = '800XXXXXXX' WHERE id = 18")
}

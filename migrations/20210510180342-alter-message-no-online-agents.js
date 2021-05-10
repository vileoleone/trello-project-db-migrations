
exports.up = async (db) => {
  await db.runSql('UPDATE configs SET value = "Não existem agentes disponíveis, aguarde pois em breve entraremos em contato." WHERE field = "no_online_agents"')
}

exports.down = async (db) => {
  await db.runSql('UPDATE configs SET value = "Não existem agentes online, aguarde pois em breve entraremos em contato." WHERE field = "no_online_agents"')
}

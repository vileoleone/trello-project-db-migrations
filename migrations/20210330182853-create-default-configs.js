
exports.up = async (db) => {
  await db.runSql('INSERT INTO configs (field, value) VALUES ("no_online_agents","Não existem agentes online, aguarde pois em breve entraremos em contato.")')
  await db.runSql('INSERT INTO configs (field, value) VALUES ("wait_for_agent","Aguarde enquanto encontramos o seu agente.")')
  await db.runSql('INSERT INTO configs (field, value) VALUES ("welcome_chat_message","olá, seja bem vindo ao nosso atendimento online.")')
}

exports.down = async (db) => {
  await db.runSql('DELETE from configs')
}

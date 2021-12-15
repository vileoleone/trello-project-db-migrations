const message = 'Este atendimento foi finalizado por falta de interação, para iniciar outro atendimento basta enviar uma nova mensagem.'

exports.up = async (db) => {
  await db.runSql(`UPDATE bots SET abandoned_message = '${message}'`)
}

exports.down = async (db) => (
  await db.runSql('UPDATE bots SET abandoned_message = null')
)

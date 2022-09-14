const { dataType } = require('db-migrate-shared')
const { STRING } = dataType
const capitalize = require('capitalize')

exports.up = async (db) => {
  const agents = await db.runSql('SELECT id, name FROM agents WHERE name LIKE ? ORDER BY id', ['%@%'])

  for (const agent of agents) {
    const nickname = agent.name.toLowerCase()
    const name = nickname.split('@')[0].split('.').map(capitalize).join(' ')
    await db.runSql('UPDATE agents SET name = ?, nickname = ? WHERE id = ?', [name, nickname, agent.id])
  }
}

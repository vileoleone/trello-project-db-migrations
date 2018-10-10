import execute from '../lib/execute'

export default async (db, customerId, agentId) => {
  let query = `
  SELECT COUNT(*) AS qtd
  FROM ${customerId}.agents
  WHERE agents.id = ?
  `
  const result = await execute(db, query, [agentId])
  return result[0].qtd === 1
}

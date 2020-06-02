const { dataType } = require('db-migrate-shared')
const { STRING } = dataType

exports.up = async (db) => {
  await db.addColumn('call_types', 'config', { type: STRING })

  const callTypes = [
    { id: 1, name: 'LDI', config: JSON.stringify({ FORMAT: { mask: 'XX', prefix: '00', label: '00XX' } }) },
    { id: 2, name: 'LDN Cod. Especial', config: JSON.stringify({ FORMAT: { mask: 'XXXX', prefix: '0(XX) 1', label: '0(XX) 1XXXX' }, DDD: {} }) },
    { id: 3, name: 'LDN Fixo', config: JSON.stringify({ FORMAT: { mask: '[2-5]XXXXXXX', prefix: '0(XX) ', label: '0(XX) [2-5]XXXXXXX' }, DDD: {} }) },
    { id: 4, name: 'VC2', config: JSON.stringify({ FORMAT: { mask: 'XXXXXXXX', prefix: '0(XX) 9', label: '0(XX) 9XXXXXXXX' }, DDD: { startsWith: 'D' } }) },
    { id: 5, name: 'VC3', config: JSON.stringify({ FORMAT: { mask: 'XXXXXXXX', prefix: '0(XX) 9', label: '0(XX) 9XXXXXXXX' }, DDD: { notStartsWith: 'D' } }) },
    { id: 6, name: 'Local Cod. Especial', config: JSON.stringify({ FORMAT: { mask: 'XXXX', prefix: '1', label: '1XXXX' }, DDD: { default: ['DD'], disable: true } }) },
    { id: 7, name: 'Local', config: JSON.stringify({ FORMAT: { mask: '[2-6]XXXXXXX', prefix: '', label: '[2-6]XXXXXXX' }, DDD: { default: ['DD'], disable: true } }) },
    { id: 8, name: 'VC1', config: JSON.stringify({ FORMAT: { mask: 'XXXXXXXX', prefix: '9', label: '9XXXXXXXX' }, DDD: { default: ['DD'], disable: true } }) },
    { id: 9, name: 'Nao Geografico Gratuito', config: JSON.stringify({ FORMAT: { mask: 'XXXXXXX', prefix: '0800', label: '0800XXXXXXX' }, DDD: { disable: true, default: ['XX'] } }) },
    { id: 10, name: 'Nao Geografico Tarifado', config: JSON.stringify({ FORMAT: { mask: '[3,8]00XXXXXXX', prefix: '0', label: '0[3,8]00XXXXXXX' }, DDD: { disable: true, default: ['XX'] } }) }
  ]

  await Promise.all(callTypes.map(({ id, config }) => db.runSql(`UPDATE call_types SET config = '${config}' WHERE id = ${id}`)))
}

exports.down = async (db) => {
  await db.removeColumn('call_types', 'config')
}

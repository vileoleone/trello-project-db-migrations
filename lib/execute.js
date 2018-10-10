export default async (mysql, sql, params) => {
  const statement = await getStatement(mysql, sql)
  const result = await statement.execute(undefinedToNull(params))
  return result[0]
}

const getStatement = async (mysql, sql) => {
  statements[sql] = statements[sql] || await mysql.prepare(sql)
  return statements[sql]
}

let statements = {}

const undefinedToNull = params => params.map(value => value === undefined ? null : value)

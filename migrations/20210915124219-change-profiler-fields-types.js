
exports.up = async (db) => {
  await db.renameColumn('profilers_responses_fields', 'val_TEXT', 'val_text')

  await db.changeColumn('profiler_fields', 'type', {
    type: 'ENUM',
    length: "'TEXT', 'DATE', 'FLOAT', 'RADIO', 'SELECT', 'INTEGER', 'CHECKBOX', 'MULTISELECT'",
    notNull: true
  })
}

exports.down = () => {}

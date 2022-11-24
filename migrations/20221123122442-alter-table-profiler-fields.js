exports.up = async (db) => {
  await db.changeColumn('profiler_fields', 'type', { type: 'ENUM', length: "'TEXT','DATE','FLOAT','RADIO','SELECT','INTEGER','CHECKBOX','MULTISELECT','BUTTON'" })
}


exports.down = async (db) => {
  await db.changeColumn('profiler_fields', 'type', { type: 'ENUM', length: "'TEXT','DATE','FLOAT','RADIO','SELECT','INTEGER','CHECKBOX','MULTISELECT'" })
}

const { dataType } = require('db-migrate-shared')
const { INTEGER, DATE_TIME, STRING, SMALLINT, TEXT, CHAR } = dataType

const extensionModelIdType = { type: SMALLINT }
const lcrProfileIdType = { type: SMALLINT }
const extensionIdType = { type: CHAR, length: 12 }
const callTypeIdType = { type: INTEGER }

const extensionModels = [
  { id: 1, brand: 'Vonix', model: 'VonixPhone' },
  { id: 2, brand: 'Polycom', model: 'SoundPoint IP320/330' },
  { id: 3, brand: 'Polycom', model: 'SoundPoint IP321/331' },
  { id: 4, brand: 'Polycom', model: 'SoundPoint IP335' },
  { id: 5, brand: 'Polycom', model: 'SoundPoint IP430' },
  { id: 6, brand: 'Polycom', model: 'SoundPoint IP450' },
  { id: 7, brand: 'Polycom', model: 'SoundPoint IP501' },
  { id: 8, brand: 'Polycom', model: 'SoundPoint IP550' },
  { id: 9, brand: 'Polycom', model: 'SoundPoint IP560' },
  { id: 10, brand: 'Polycom', model: 'SoundPoint IP601' },
  { id: 11, brand: 'Polycom', model: 'SoundPoint IP650' },
  { id: 12, brand: 'Polycom', model: 'SoundPoint IP670' },
  { id: 13, brand: 'Yealink', model: 'SIP-T18P' },
  { id: 14, brand: 'Yealink', model: 'SIP-T20P' },
  { id: 15, brand: 'Yealink', model: 'SIP-T22P' },
  { id: 16, brand: 'Yealink', model: 'SIP-T26P' },
  { id: 17, brand: 'Yealink', model: 'SIP-T28P' },
  { id: 18, brand: 'Yealink', model: 'SIP-T32G' },
  { id: 19, brand: 'Yealink', model: 'SIP-T38G' },
  { id: 20, brand: 'Outro', model: '' }
]

exports.up = async (db) => {
  await createExtensionModels(db)
  await createLcrProfiles(db)
  await createExtensions(db)
  await createExtensionDialPermissions(db)
}

exports.down = async (db) => {
  await db.dropTable('extension_dial_permissions')
  await db.dropTable('extensions')
  await db.dropTable('lcr_profiles')
  await db.dropTable('extension_models')
}

const createExtensionModels = async (db) => {
  await db.createTable('extension_models', {
    id: { ...extensionModelIdType, notNull: true, primaryKey: true, autoIncrement: true },
    brand: { type: STRING, length: 128, notNull: true },
    model: { type: STRING, length: 128, notNull: true }
  })

  await Promise.all(extensionModels.map(({ id, brand, model }) => db.runSql(`INSERT INTO extension_models (id, brand, model) VALUES (${id}, '${brand}', '${model}')`)))
}

const createLcrProfiles = async (db) => {
  await db.createTable('lcr_profiles', {
    id: { ...lcrProfileIdType, notNull: true, primaryKey: true, autoIncrement: true },
    name: { type: STRING, length: 256, notNull: true }
  })

  await db.runSql("INSERT INTO lcr_profiles (id, name) VALUES (1, 'Padrão')")
}

const createExtensions = async (db) => {
  await db.createTable('extensions', {
    id: { ...extensionIdType, notNull: true, primaryKey: true },
    description: { type: TEXT },
    mac_address: { type: STRING, length: 15, notNull: true },
    profile: { type: 'ENUM', length: "'CALLCENTER', 'ADMIN'", notNull: true },
    extension_model_id: { ...extensionModelIdType, notNull: true },
    call_group: { type: INTEGER, length: 6 },
    call_limit: { type: INTEGER, length: 3 },
    codec_profile: { type: 'ENUM', length: "'WIDEBAND', 'NARROWBAND'", notNull: true },
    lcr_profile_id: { ...lcrProfileIdType },
    password: { type: STRING, length: 256, notNull: true },
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },
    created_at: { type: DATE_TIME, notNull: true },
    updated_at: { type: DATE_TIME, notNull: true }
  })

  await db.addForeignKey('extensions', 'extension_models', 'fk_extensions_extension_models', { extension_model_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('extensions', 'index_extensions_extension_models', ['extension_model_id'])

  await db.addForeignKey('extensions', 'lcr_profiles', 'fk_extensions_lcr_profiles', { lcr_profile_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('extensions', 'index_extensions_lcr_profiles', ['lcr_profile_id'])

  await db.addIndex('extensions', 'unique_extensions_mac_address', ['mac_address'], true)
}

const createExtensionDialPermissions = async (db) => {
  await db.createTable('extension_dial_permissions', {
    extension_id: { ...extensionIdType, notNull: true },
    call_type_id: { ...callTypeIdType, notNull: true }
  })
  await db.runSql('ALTER TABLE extension_dial_permissions ADD CONSTRAINT pk_extension_dial_permissions PRIMARY KEY (extension_id, call_type_id)')

  await db.addForeignKey('extension_dial_permissions', 'extensions', 'fk_extension_dial_permissions_extensions', { extension_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('extension_dial_permissions', 'index_extension_dial_permissions_extensions', ['extension_id'])

  await db.addForeignKey('extension_dial_permissions', 'call_types', 'fk_extension_dial_permissions_call_types', { call_type_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('extension_dial_permissions', 'index_extension_dial_permissions_call_types', ['call_type_id'])
}

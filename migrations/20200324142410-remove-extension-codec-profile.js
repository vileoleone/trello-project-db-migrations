exports.up = (db) => db.removeColumn('extensions', 'codec_profile')
exports.down = (db) => db.addColumn('extensions', 'codec_profile', { type: 'ENUM', length: "'WIDEBAND', 'NARROWBAND'", notNull: true, default: 'WIDEBAND' })

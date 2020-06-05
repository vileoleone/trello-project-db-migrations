const { dataType } = require('db-migrate-shared')
const { INTEGER, STRING, SMALLINT, TEXT } = dataType

const routesIdType = { type: INTEGER }
const patternsIdType = { type: INTEGER }
const lcrProfileIdType = { type: SMALLINT }
const callTypeIdType = { type: INTEGER }

const routesDefault = [
  {
    id: 1,
    call_type_id: 1,
    lcr_profile_id: 1,
    order: 0,
    ddd: [],
    format: 'XX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 2,
    call_type_id: 2,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: 'XX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 3,
    call_type_id: 2,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: 'XXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 4,
    call_type_id: 2,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: 'XXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 5,
    call_type_id: 3,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: '[2-5]XXXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 6,
    call_type_id: 4,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: 'XXXXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 7,
    call_type_id: 5,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: 'XXXXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 8,
    call_type_id: 6,
    lcr_profile_id: 1,
    order: 0,
    ddd: [],
    format: 'XX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 9,
    call_type_id: 6,
    lcr_profile_id: 1,
    order: 0,
    ddd: [],
    format: 'XXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 10,
    call_type_id: 6,
    lcr_profile_id: 1,
    order: 0,
    ddd: [],
    format: 'XXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 11,
    call_type_id: 7,
    lcr_profile_id: 1,
    order: 0,
    ddd: [],
    format: '[2-6]XXXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 12,
    call_type_id: 8,
    lcr_profile_id: 1,
    order: 0,
    ddd: [],
    format: 'XXXXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 13,
    call_type_id: 9,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: 'XXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 14,
    call_type_id: 9,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: 'XXXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 15,
    call_type_id: 10,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: '300XXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 16,
    call_type_id: 10,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: '300XXXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 17,
    call_type_id: 10,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: '800XXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  },
  {
    id: 18,
    call_type_id: 10,
    lcr_profile_id: 1,
    order: 0,
    ddd: ['XX'],
    format: '800XXXXXXX',
    default: true,
    active: true,
    patterns: [{
      order: 0,
      trunkingId: 1,
      csp: '',
      hasAreaCode: true,
      hasLeadingZero: true,
      prefix: ''
    }]
  }
]

exports.up = async (db) => {
  await createRoutes(db)
  await createPatterns(db)
  await insertDefaultFormats(db, routesDefault)
}

exports.down = async (db) => {
  await runDropForeignKeys(db)
  await db.dropTable('routes')
  await db.dropTable('patterns')
}

const createRoutes = async (db) => {
  await db.createTable('routes', {
    id: { ...routesIdType, notNull: true, primaryKey: true },
    lcr_profile_id: { ...lcrProfileIdType },
    call_type_id: { ...callTypeIdType, notNull: true },
    order_router: { type: SMALLINT },
    ddd: { type: TEXT },
    format: { type: STRING, length: 256, notNull: true },
    is_default: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 0 },
    active: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 }
  })

  await db.addForeignKey('routes', 'lcr_profiles', 'fk_routes_lcr_profiles', { lcr_profile_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('routes', 'index_routes_lcr_profiles', ['lcr_profile_id'])

  await db.addForeignKey('routes', 'call_types', 'fk_routes_call_types', { call_type_id: 'id' }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  await db.addIndex('routes', 'index_routes_call_types', ['call_type_id'])
}

const createPatterns = async (db) => {
  await db.createTable('patterns', {
    id: { ...patternsIdType, notNull: true, primaryKey: true, autoIncrement: true },
    route_id: { ...routesIdType },
    trunking_id: { type: INTEGER },
    order_pattern: { type: SMALLINT },
    csp: { type: STRING },
    prefix: { type: STRING },
    has_area_code: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 },
    has_leading_zero: { type: 'TINYINT', length: 1, notNull: true, defaultValue: 1 }
  })

  await db.addForeignKey('patterns', 'routes', 'fk_patterns_routes', { route_id: 'id' }, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' })
  await db.addIndex('patterns', 'index_patterns_routes', ['route_id'])

  await db.addForeignKey('patterns', 'trunkings', 'fk_patterns_trunkings', { trunking_id: 'id' }, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' })
  await db.addIndex('patterns', 'index_patterns_trunkings', ['trunking_id'])
}

const runDropForeignKeys = async (db) => {
  await db.removeForeignKey('routes', 'fk_routes_lcr_profiles')
  await db.removeForeignKey('routes', 'fk_routes_call_types')
  await db.removeForeignKey('patterns', 'fk_patterns_routes')
  await db.removeForeignKey('patterns', 'fk_patterns_trunkings')
}

const insertDefaultFormats = async (db, routesDefault) => {
  await Promise.all([
    ...routesDefault.map((route) => {
      return db.runSql(`
        INSERT INTO routes
          (id, call_type_id, lcr_profile_id, order_router, ddd, format, is_default, active)
        VALUES (
          ${route.id},
          ${route.call_type_id},
          ${route.lcr_profile_id},
          ${route.order},
          '${route.ddd.join(',')}',
          '${route.format}',
          ${route.default},
          ${route.active})
      `)
    }),
    ...routesDefault.map(route => insertDefaultPatterns(db, route.id, route.patterns))
  ])
}

const insertDefaultPatterns = async (db, routeId, patterns) => {
  await Promise.all(
    patterns.map((pattern) => {
      return db.runSql(`
        INSERT INTO patterns
          (route_id, trunking_id, order_pattern, csp, prefix, has_area_code, has_leading_zero)
        VALUES (
          ${routeId},
          ${pattern.trunkingId},
          ${pattern.order},
          '${pattern.csp}',
          '${pattern.prefix}',
          ${Number(pattern.hasAreaCode)},
          ${Number(pattern.hasLeadingZero)}
        )
      `)
    })
  )
}

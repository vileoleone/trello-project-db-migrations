const { dataType } = require('db-migrate-shared')
const {STRING, INTEGER, BIGINT, DATE_TIME} = dataType

exports.up = async (db) => {
  await db.createTable('cards', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    card_id: {type: STRING},
    list_id: { type: STRING},
    created_at: { type: DATE_TIME },
    read_to_do_at: { type: DATE_TIME },
    work_in_progress_at: { type: DATE_TIME },
    ready_to_test_at: { type: DATE_TIME },
    testing_at: { type: DATE_TIME },
    waiting_deploy_at: { type: DATE_TIME },
    done_at: { type: DATE_TIME },
    cycle_time: { type: BIGINT, defaulValue: 0 },
    lead_time: { type: BIGINT, defaulValue: 0 },
    step_time: { type: BIGINT, defaulValue: 0 }
  })

  /* await db.createTable('labels', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: STRING, length: 256 },
    card_id: { type: INTEGER }
  }) */

  /* await db.createTable('card_labels', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    card_id: { type: INTEGER },
    labels_id: { type: INTEGER }
  }) */

  /* await db.createTable('timeline', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    timestamp: { type: BIGINT, primaryKey: true },
    read_to_do: { type:BIGINT },
    workInProgress: { type: BIGINT },
    ready_to_test: { type: BIGINT },
    testing: { type: BIGINT },
    waiting_deploy: {type: BIGINT},
    done_at
  }) */

  // await db.addIndex('cards', 'cards_list_idx', ['list_id'] );
  // await db.addIndex('card_labels', 'cards_labels_label_idx',['label_id']);
  // await db.addIndex('card_labels','cards_labels_card_idx', [`card_id`]  )
}

exports.down =  async  function(db) {
  await db.dropTable('cards')
}
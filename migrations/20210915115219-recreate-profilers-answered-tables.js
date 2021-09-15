
exports.up = async (db) => {
  await db.dropTable('profilers_responses_fields')
  await db.dropTable('profilers_attendances')
  await new Promise((resolve) => setTimeout(resolve, 1500))

  await db.runSql(`
    CREATE TABLE \`profilers_attendances\` (
      \`id\` BIGINT(20) NOT NULL AUTO_INCREMENT,
      \`profiler_id\` BIGINT(20) NOT NULL,
      \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`agent_id\` int(11) NOT NULL,
      \`call_id\` VARCHAR(128) DEFAULT NULL,
      \`chat_id\` BIGINT(20) DEFAULT NULL,
      \`contact_id\` BIGINT(20) DEFAULT NULL,
      \`contact\` VARCHAR(255) DEFAULT NULL,
      \`direction\` enum('IN','OUT','AUTO') NOT NULL,
      \`type\` enum('CALL','TEXT') NOT NULL,

      PRIMARY KEY (\`id\`),

      KEY idx_profilers_attendances_call (\`call_id\`),
      KEY idx_profilers_attendances_chat (\`chat_id\`),
      KEY idx_profilers_attendances_agent (\`agent_id\`),
      KEY idx_profilers_attendances_contact (\`contact_id\`),
      KEY idx_profilers_attendances_profiler (\`profiler_id\`)

    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `)

  await db.runSql(`
    CREATE TABLE profilers_responses_fields (
      \`profiler_attendance_id\` BIGINT(20) NOT NULL,
      \`profiler_field_id\` BIGINT(20) DEFAULT NULL,

      \`val_option\` VARCHAR(255) DEFAULT NULL,
      \`val_number\` DECIMAL(15,3) DEFAULT NULL,
      \`val_TEXT\` TEXT,
      \`val_period\` DATETIME DEFAULT NULL,

      KEY idx_profilers_responses_option (\`val_option\`),
      KEY idx_profilers_responses_number (\`val_number\`),
      KEY idx_profilers_responses_period (\`val_period\`),
      KEY idx_profilers_responses_attendance (\`profiler_attendance_id\`, \`profiler_field_id\`)

    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `)
}

exports.down = () => {}

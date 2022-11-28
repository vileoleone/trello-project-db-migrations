exports.up = async (db) => {
  await db.runSql('ALTER TABLE bots MODIFY source_type VARCHAR(36)')
  await db.runSql('ALTER TABLE bot_templates MODIFY category VARCHAR(36)')

  await db.runSql('ALTER TABLE agent_summary DROP FOREIGN KEY fk_agent_summary_agents').catch(console.log)
  await db.runSql('ALTER TABLE pause_summary DROP FOREIGN KEY fk_pause_summary_agents').catch(console.log)
  await db.runSql('ALTER TABLE queue_summary DROP FOREIGN KEY fk_queue_summary_queues').catch(console.log)
  await db.runSql('ALTER TABLE calls DROP FOREIGN KEY fk_calls_agents').catch(console.log)
  await db.runSql('ALTER TABLE calls DROP FOREIGN KEY fk_calls_call_types').catch(console.log)
  await db.runSql('ALTER TABLE calls DROP FOREIGN KEY fk_calls_queues').catch(console.log)
  await db.runSql('ALTER TABLE memberships DROP FOREIGN KEY fk_memberships_agents').catch(console.log)
  await db.runSql('ALTER TABLE memberships DROP FOREIGN KEY fk_memberships_queues').catch(console.log)

  await db.runSql('ALTER TABLE agent_summary DROP INDEX index_agent_summary_agent_id').catch(console.log)
  await db.runSql('ALTER TABLE agent_summary DROP INDEX index_agent_summary_queue_id').catch(console.log)  
  await db.runSql('ALTER TABLE pause_summary DROP INDEX index_pause_summary_agent_id').catch(console.log)
  await db.runSql('ALTER TABLE queue_summary DROP INDEX index_queue_summary_queue_id').catch(console.log)
  await db.runSql('ALTER TABLE calls DROP INDEX index_calls_caller_number').catch(console.log)
  await db.runSql('ALTER TABLE memberships DROP INDEX index_memberships_agent_id').catch(console.log)
  await db.runSql('ALTER TABLE memberships DROP INDEX index_memberships_queue_id').catch(console.log)
}

exports.up = async (db) => {
  await db.runSql('ALTER TABLE patterns DROP FOREIGN KEY fk_patterns_routes')
  await db.runSql('ALTER TABLE routes MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT')
  await db.addForeignKey('patterns', 'routes', 'fk_patterns_routes', { route_id: 'id' }, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' })
}

exports.down = async (db) => {
  await db.runSql('ALTER TABLE patterns DROP FOREIGN KEY fk_patterns_routes')
  await db.runSql('ALTER TABLE routes MODIFY COLUMN id INT NOT NULL')
  await db.addForeignKey('patterns', 'routes', 'fk_patterns_routes', { route_id: 'id' }, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' })
}

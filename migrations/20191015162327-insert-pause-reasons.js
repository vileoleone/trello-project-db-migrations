exports.up = async (db) => {
  await db.runSql(`INSERT INTO pause_reasons
    (id, description)
    VALUES
    (1, 'Avaliacao'),
    (2, 'Treinamento'),
    (3, 'Lanche'),
    (4, 'Toalete'),
    (5, 'Ginastica'),
    (6, 'Erro de sistema')
    ON DUPLICATE KEY UPDATE
    description = VALUES(description)
  `)
}

exports.down = (db) => {}

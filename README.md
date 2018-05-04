# migrator-db

## Criar nova migrations
```shell
node migrator.js --add nome-da-migration
```

## Executar todas as migrations pendentes
```shell
node migrator.js --up
```

## Executar uma ou mais migrations por vez
```shell
node migrator.js --up 1
```

## Desfazer uma migration
```shell
node migrator.js --down
```

## Desfazer duas ou mais migrations
```shell
node migrator.js --down 2
```

## Passar dados de acesso da conexão com parametros
```shell
node migrator.js --up --user root --host 0.0.0.0 --port 3306 --driver mysql --password minha-senha-dificil --database callcenter
```

## Passar dados de acesso da conexão com variáveis de ambiente
```shell
export DB_USER=root
export DB_HOST=0.0.0.0
export DB_PORT=3306
export DB_DRIVER=mysql
export DB_PASS=minha-senha-dificil
export DB_NAME=callcenter

node migrator.js --up
```

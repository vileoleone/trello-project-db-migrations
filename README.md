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
node migrator.js --up --user root --host 0.0.0.0 --port 3306 --driver mysql --password callcenter --database callcenter
```

## Passar dados de acesso da conexão com variáveis de ambiente
```shell
export DATABASE_URL='mysql://callcenter:callcenter@0.0.0.0:3306/callcenter'
node migrator.js --up
```

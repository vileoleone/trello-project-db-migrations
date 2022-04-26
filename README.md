# migrator-db

Módulo responsável pelo banco de dados do vonix-blackbox callcenter.

Contém as _migrations_ para gerenciamento/atualização do esquema do banco de dados.

Contém as instruções de acesso e atualização dos dados do banco de dados, de forma
a centralizar o acesso a dados. *Todo* o acesso a dados ou atualização dos mesmos deve estar
neste repositório, possibilitando o reuso e consistência entre a versão do esquema e instruções
que tocam nos dados.

## Para atualizar o esquema do banco de dados

### Passar dados de acesso da conexão com variáveis de ambiente
```shell
export DATABASE_URL='mysql://callcenter:callcenter@0.0.0.0:3306/callcenter'
node migrator.js --up
```

### Sincroniar uma base da Nuvem
make sync-aurora db="nome da base" pass="senha da base"

### Criar nova migration
```shell
node migrator.js --add nome-da-migration
```

### Executar todas as migrations pendentes
```shell
node migrator.js --up
```

### Executar uma ou mais migrations por vez
```shell
node migrator.js --up 1
```

### Desfazer uma migration
```shell
node migrator.js --down
```

### Desfazer duas ou mais migrations
```shell
node migrator.js --down 2
```

## Para usar/importar este módulo em outros projetos

### Adicionar o módulo como dependência de desenvolvimento

```shell
yarn add --dev webpack-node-externals https://luizsimples:gxV8dwNGUdt8mdKuCwsm@bitbucket.org/vonix/callcenter-db.git
# or specifying a version
yarn add --dev webpack-node-externals https://luizsimples:gxV8dwNGUdt8mdKuCwsm@bitbucket.org/vonix/callcenter-db.git\#branch-tag-or-commit

```

Configurar o webpack para incluir as instruções de acesso/atualização de dados no pacote final.

```javascript
// webpack.config.js
import nodeExternals from 'webpack-node-externals'

module.exports = {
  // ...
  externals: [nodeExternals({
    whitelist: [/callcenter-db\/stmt/]
  })],
  // ...
}
```

# WishlistApi

Aplicação desenvolvida em [NodeJS 19.7.0](https://nodejs.org), focada na criação de listas de desejos para usuários logados. Os produtos das listas são disponibilizados a partir da integação com api de terceiros.

# Armazenamento de Dados

Esta aplicação trabalha com armazenamento em memória, sendo assim, não há uso de banco de dados ou qualquer outro tipo de persistência a longo prazo, ou seja, após a interrupção da aplicação todos os dados são perdidos.

# Instalação

Esta aplicação foi desenvolvida sob linux utilizando algumas ferramentas excenciais, sendo assim, é necessário instalar as dependências do projeto listadas abaixo para que seja possível subir todos os serviços para sua execução.

Dependências para execução dockerizada:

```
Make
Docker
```

Dependências para execução diretamente em máquina local (opcional):

```
Npm v9.6.7+
NodeJS v19.7.0+
```

Após certificar-se de que as dependências estejam instaladas na máquina que irá executar esta aplicação, pode-se facilmente subir os serviços utilizando os comandos listados nos arquivos `package.json` e/ou `Makefile`.

É recomendado o uso dos comandos `Makefile` para aqueles que desejarem rodar a aplicão completamente dockerizada, neste cenário, não se faz necessária a instalação das dependências para exeução em máquina local.

* Caso ocorra algum problema relacionado a permissão durante a execução de algum comando do package.json ou Makefile, talvez seja necessário excluir os diretórios `dist` e `node_modules` e reinstalar os pacotes.

# Makefile

O arquivo `Makefile` possui comandos pré-configurados que auxiliam algumas rotinas em ambiente dockerizado, tais como: Inicializar a aplicação, rodar os testes e convenção de código, assim como também manipular arquivos contendo variáveis de ambiente encriptadas e tags no github.

Para exibir a relação de comandos disponíveis e seus respectivos modos de uso, basta aplicar um dos dois comandos abaixo:

```
$ make
$ make help
```

# Inicialização da Aplicação

A abordagem a partir deste ponto será voltada à disponibilização dos serviços e a iniciaização da aplicação de forma dockerizada. Para isso, é necessário que inicialmente as imagens a serem utilizadas no Docker sejam construídas.

Para a construção das imagens, aplique o comando abaixo:

```
$ make build
```

Em alguns casos, pode-se fazer necessária a instalar das dependências do projeto aplicando o comando abaixo:

```
$ make packages
```

A partir deste ponto tudo o que é necessário encontra-se devidamente instalado e disponível. Caso seja necessário executar testes e análise de código, os comandos abaixo devem ser utilizados:

```
$ make tests mode=verbose|cov
$ make code-convention mode=analyzer|fix
```

Por fim, para inicializar a aplicação basta aplicar o seguinte comando:

```
$ make start mode=dev|debug|prod
```

Caso corra tudo conforme o esperado, a aplicação estará disponível na seguinte url http://localhost:3000.

# Variáveis de Ambiente

As variáveis de ambiente estão configuradas no arquivo `.env` e estão organizadas por tipo de uso e setadas para desenvolvimento local. Toda configuração é aplicada automaticamente tanto para inicialização em ambiente Docker quanto em máquina local.

Caso seja necessário alterar alguma variável, basta editá-las. As alterações serão aplicadas em todos os modos de inicialização.

Em ambientes externos voltados a staging e production, as variáveis de ambiente são encriptadas e estão localizadas no diretório `.k8s`, que também possui outras configurações para deploy em [kubernetes](https://kubernetes.io/pt-br).

Para encriptar e/ou desencripar as variáveis de ambiente de staging e production é necessario que o ambiente de infra esteja devidadamente alinhado com esta aplicação, porém, de acordo com o objetivo desta aplicação, este recurso não se faz necessário e não será devidamente documentado neste repositório, ainda assim, caso seja de interesse das partes, notifique-me para a demonstração de uso.

# Autorização

A aplicação está configurada para ser acessível apenas por `clientes` (interfaces, aplicações integradas e afins) que possuam chaves de api previamente configuradas.

As chaves de api devem ser setadas na variável de ambiente `API_KEYS`. Não há formato definido para tal, porém, as chaves devem ser separadas por vírgula e futuramente poderão ser usadas para identificar os `clientes` que as estão utilizando.

* Para todas as requests feitas para esta aplicação o header `ApiKey` deve ser enviado setado com uma das chaves de api previamente configuradas.

# Autenticação

Assim como a autorização fornece certo nível de segurança ao acesso da aplicação, é necessário estar logado como usuário previamente cadastrado para ter acesso aos recursos implementados.

Certifique-se de atribuir valor à variável de ambiente `JWT_SECRET` para que a aplicação possa gerar os tokens de acesso para usuários que realizarem login. Neste caso também não há formato definido, porém, em ambos os casos recomenda-se a utilização de hashes de 32 bits ou semelhantes.

Com exceção das requests feitas para as urls dos produtos, assim como também, para a url de criação e login de usuários, todas as demais requests feitas para esta aplicação necessitam do header `Authorization`.

* As requests feitas para o cadastro, login e atualização de usuários retornam o header `access-token` contendo o token necessário no header descrito acima.

# Workflows

Foram implementadas actions que são executadas em diferentes cenários com o objetivo de aplicar testes e análise de código, assim como também o deploy da aplicação.

Para que as actions relacionadas aos testes e análise de código sejam executadas, basta a realização do push para a branch na qual está recebendo modificações, caso as actions identifiquem problemas, o merge da branch junto a branch main não será permitido.

Quanto ao deploy, esta action utiliza workflows compartihados e assim como as variáveis de ambiente encriptadas e demais recursos de deploy, é necessário estar alinhado com o ambiente de infra, porém, a nível de explicação, para execução da action, basta criar tags em formato preestabelecido e o processo inicializará automaticamente.

# Documentação

Esta aplicação possui todas as rotas e os detalhes mais importantes exemplificados em documentação gerada pelo postman. Os arquivos da documentação estão no diretório `.docs`, assim como também, é navegável acessando a url abaixo:

```
https://documenter.getpostman.com/view/4274276/2s93sc6DX5#intro
```

Há também uma documentação parcial gerada pelo swagger que está acessível em ambiente de desenvolvimento através da url abaixo:

```
http://localhost:3000/docs
```

# Melhorias Necessárias

* Integração com ferramentas de log e monitoramento, tais como: Sentry, Prometheus e Grafana
* Implementação de testes e documentação de forma mais elaborada levando em consideração outros cenários
* Configuração e aplicação de linter a fim de satisfazer os padrões do projeto
* Migrar armazenamento em memória para banco de dados
* Incrementar documentação do swagger

# Pricipais Tecnologias Utilizadas

* [NestJs](https://nestjs.com)
* [ClassValidator](https://github.com/typestack/class-validator)
* [ClassTransformer](https://github.com/typestack/class-transformer)
* [Swagger](https://swagger.io)
* [Postman](https://www.postman.com)
* [JestJs](https://jestjs.io/pt-BR/)
* [Faker](https://github.com/faker-js/faker)

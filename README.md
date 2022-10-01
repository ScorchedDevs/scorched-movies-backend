[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=ScorchedDevs_scorched-movies-backend)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ScorchedDevs_scorched-movies-backend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ScorchedDevs_scorched-movies-backend) 
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ScorchedDevs_scorched-movies-backend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ScorchedDevs_scorched-movies-backend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ScorchedDevs_scorched-movies-backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ScorchedDevs_scorched-movies-backend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ScorchedDevs_scorched-movies-backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ScorchedDevs_scorched-movies-backend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ScorchedDevs_scorched-movies-backend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ScorchedDevs_scorched-movies-backend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ScorchedDevs_scorched-movies-backend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ScorchedDevs_scorched-movies-backend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ScorchedDevs_scorched-movies-backend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ScorchedDevs_scorched-movies-backend)
# Scorched Movies Backend
Esse é um projeto feito no framework Django para ser o backend da aplicação Scorched Movies, cujo o propósito é fazer downloads automaticos de conteúdo de mídia em torrent e disponibilizar, automaticamente, esse conteúdo via Plex.

## Recomendações

Para editar esse projeto é recomendado que se use o sistema operacional linux, principalmente por ser um projeto que contempla a tecnologia Docker.

## Devcontainer

Esse projeto conta com a configuração devcontainer do VSCode, por isso o melhor jeito de trabalhar nesse projeto é fazer o download do VSCode, instalar a extenção  "remote containers" e, ao abrir o projeto, clicar em "reopen in container". Dessa forma todas as dependencias e extenções utilizadas para trabalahr nesse projeto serão instaladas automáticamente.

## Debugging

Esse projeto também conta com launch.json, mais uma funcionalidade do VSCode, então para rodar a aplicação ao testar, basta apertar F5 que ele entrará no modo debug, deixando esse passo ainda mais fácil.

## Como contribuir com o projeto?

Para contribuir com o projeto é interessante que se siga as seguintes regras:

### Issues

A issue deve ser criada quando algo for ser implementado no código. Por exemplo, para criar um esquema de autenticação de usuário para acessar nossa aplicação. Criasse uma issue para implementar o loing, uma outra issue para implementar o logout, e uma issue para alterar a senha, por exemplo. Caso, para atingir um objetivo específico, como nesse caso, criar um esquema de login, você precise finalizar 3 ou mais issues, seria interessante que você fizesse uma Milestone linkando todas as issues, assim fica mais fácil de acompanhar quanto falta para que determindada funcionalidade seja implementada.

### Branches

Para criar uma branch que resolve um determinado issue, seria interessante que você especifique se é uma feature nova ou um bugfix e então indique qual a issue relacionada à branch. Então deveriamos seguir o padrão
"tipo/issue-xxx", como por exemplo: "feature/issue-001".

### Commits

Os commits também devem seguir um padrão para facilitar a organização d o trabalho em grupo. Então os commits devem seguir o seguinte padrão "#xxx - descrição do commit" sendo xxx o número da issue relacionada ao commit. Por exemplo: "#001 - Adicionando login de usuários".

### PR (Pull Requests)

Para fazer um PR é interessante que ele esteja linkado a uma issue, ver a [documentação](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) para fechar as issues automaticamente com as PRs.

### Actions

Esse projeto conta com algumas github actions. Isso significa que o projeto tem algumas automações, como por exemplo, testar o lint e validar o projeto Django. Um PR só será aceito, caso passe todas as etapas do GitHub actions.

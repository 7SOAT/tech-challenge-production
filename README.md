<p align="center">
  <img src="https://i.ibb.co/nM93Y6b/Novo-Projeto.png" alt="Pos-tech logo">
</p>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=7SOAT_tech-challenge-production&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=7SOAT_tech-challenge-production)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=7SOAT_tech-challenge-production&metric=coverage)](https://sonarcloud.io/summary/new_code?id=7SOAT_tech-challenge-production)

<h1 align="center">🍔🥤🍨 Sistema de autoatendimento de Fast Food 🍨🥤🍔</h1>

<h2 id="microsservico">:pencil: Microsserviço de Produção</h2>
<p align="justify">
  Esse projeto consiste na criação de um microsserviço com recursos para atender as demandas da cozinha.
  Mantendo a fila de pedidos sempre atualizada e organizada.
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
<h2>🏗️ Estrutura do projeto</h2>

```
src
├── adapters
|   ├── controllers
|   ├── gateways
|   ├── presenters
├── api
├── core
|   ├── entities
|   ├── type
|   ├── usecases
├── externals
|   ├── datasource
|   ├── providers
├── app.module.ts
└── main.ts
```
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
<h2 id="requisitos"> ⚙️ Rodando o projeto</h2>

<ol start="1">
  <li>
    <h3>Clonando o repositório</h3>

    git clone https://github.com/7SOAT/tech-challenge-production.git
    cd tech-challenge-production
  </li>
  <li>
    <h3>Instalar bibliotecas</h3>
    <p>Para instalar as bibliotecas, abra o terminal na raiz do projeto e execute o seguinte comando:</p>

    npm install
  </li>
  <li>
    <h3>Rodar instâncias no Docker</h3>
    <p>Para rodar as instâncias do banco e da aplicação no Docker, a maneira mais simples é utilizar a extensão do VSCode, explicada no gif abaixo:</p>
    <img src="https://code.visualstudio.com/assets/docs/containers/overview/select-subset.gif">
    <p>Ou se preferir pode ser feito pelo terminal com:</p>
    <p> - Para windows:</p>

      docker-compose up --build

   <p> - Para Linux/macOS</p>

     docker compose up --build
  </li>
  <li>Subindo a imagem, o projeto já estará pronto para receber requisições através do Postman ou Insomnia</li>
</ol>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="miro"> MIRO </h2>
Link: <a href="https://miro.com/welcomeonboard/M3R3Z0xXNFFwb200QTZueWZENjRrdXdRS0NQdzFwdzF1SFNCTHNYTmttMi9GOGZ6cmVOQmJoWWZhUGlKOFZkWnNKYWxrLzFIYlBldUxnT0VlTWoxRFJUclJ5YlBiU1IycHc5Smpnb0h1a0d0ZlJheWZ3ZTJhcU1HZjRPRjdtMmkhZQ==?share_link_id=370719952948"/>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="requisitos"> 👤 Integrantes</h2>

[<img src="https://avatars.githubusercontent.com/u/76217994?v=4" width=115 > <br> <sub> Aureo Alexandre </sub>](https://github.com/Aureo-Bueno) | [<img src="https://avatars.githubusercontent.com/u/97612275?v=4" width=115 > <br> <sub> Fauze Cavalari </sub>](https://github.com/devfauze) | [<img src="https://avatars.githubusercontent.com/u/53823656?v=4" width=115 > <br> <sub> Gabriella Andrade </sub>](https://github.com/GabiAndradeD) | [<img src="https://avatars.githubusercontent.com/u/61785785?v=4" width=115 > <br> <sub> Luiz H. L. Paino </sub>](https://github.com/luizhlpaino) |
| :---: | :---: | :---: | :---: |
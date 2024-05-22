<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<div align='center'>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![GPLv3 License][license-shield]][license-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://geyser.fund">
    <img src="https://storage.googleapis.com/geyser-projects-media/app/logo-name-brand.svg" alt="Logo" width="400">
  </a>

  <h3 align="center">Transform ideas into real-life projects</h3>

  <div align='center'>

  [![Discord][discord-shield]][discord-url]

  [![Telegram][telegram-shield]][telegram-url]
  [![X][x-shield]][x-url]

  </div>

  <p align="center">
    Geyser is a bitcoin & nostr native crowdfunding platform where you can fund project ideas with the support from global communities.
    <br />
    <a href="https://geyser.fund/launch"><strong>Launch your project »</strong></a>
    <br />
    <br />
    <a href="https://geyser.fund/">Explore live projects</a>
    ·
    <a href="https://github.com/geyserfund/geyser-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/geyserfund/geyser-app/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Where great ideas find great communities
<br />
<div align="center">
    <img src="https://storage.googleapis.com/geyser-projects-media/images/readme-image2.png" alt="geyser Screenshot">
</div>

### Enabling the Open Creator Economy
Traditional Crowdfunding and Creator Platforms are built on closed monetary and social networks, which limits the use of crowdfunding (a powerful financial primitive) to around 30 Western countries and restricts project reach and social interaction to the platform. 

Geyser is enabling the Open Creator Economy, by building fundraising on top of open Bitcoin/Lightning, open monetary networks, and Nostr, an open social network. With these tools we can empower creators globally to reach their communities and raise funds from them.

As an open company, we also build Open Source software and rely on the support of contributors to change the world for the better.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* [![Typescript][Typescript.ts]][Typescript-url]
* [![ChakraUI][Chakra.ui]][Chakra-url]
* [![GraphQL][Graph.ql]][GraphQL-url]
* [![React Router][React.router]][ReactRouter-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

<br />

### Prerequisites

**Yarn**
We use yarn as a dependency manager, install yarn if not already installed
- `npm install --global yarn`

**Docker** ( optional )
We can use `docker` and `docker compose` for local development of the `geyser-app`.
If you prefer using docker for development, make sure to have them installed on your local development machine, see [here](https://docs.docker.com/get-docker/).

<br />

### Installing Dependencies

Clone the repo, get into the repo directory and run:
```shell
yarn
```

<br />

### Environment Variables

The app requires some environment variables to be set. We provide an `example.env` file that you can copy to the a local `.env` file:

```shell
cp .env.example .env
```

From there, populate the new file with the correct values. You have two development environment options, detailed below.


<br />

### Running the App Locally

<br />

#### Option 1: use the staging API with Docker

Make sure to complete the instructions described in [Hosts Configuration](#hosts-configuration), before proceeding using this method.

Currently, the staging API is the only way to get a functional authentication flow in standalone `geyser-app` development environment.

To use the staging API, fill in the following value in the `.env` file:

```shell
VITE_APP_API_ENDPOINT=https://api.staging.geyser.fund
```

Start the server:
```shell
make dev
```

<br />

#### Option 2: use the staging API on host machine

Many at times we prefer using host machine intead of docker to run the server. In such cases we can use them directly.

Install dependencies:
```shell
yarn install
```

Start the server:
```shell
yarn dev
```

<br />

#### Docker

If you run into problems running the app through make command, you can run the app by running the following command in the project directory, as long as one of the docker configuration above is satisfied.

```shell
docker compose up -d
```

Or, if you are running an older version of docker and have docker-compose installed separately, run:

```shell
docker-compose up -d
```

To see the react app logs use the following command:

```shell
docker compose logs -f geyser-app
```

or

```shell
docker-compose logs -f geyser-app
```

<br />

### Hosts Configuration

<br />

#### Staging API

In order for the requests to go through to the staging backend API, you will need to add the following line to your `/etc/hosts` file:

```shell
127.0.0.1 staging.geyser.fund
```

This makes sure that you are able to make requests to the staging API from your local development environment with encountering CORS errors.

<br />

#### GraphQL Faker

If running against the GraphQL Faker server, you'll also need these in the same `/etc/hosts` file:

```shell
127.0.0.1 dev.geyser.fund
127.0.0.1 api.dev.geyser.fund
```

<br />

### Trusting Caddy Local CA Certificate

We are using Caddy as a reverse proxy to serve the local development app over HTTPS. This means that you will need to trust the Caddy Local CA Certificate in order to avoid any `ERR_CERT_AUTHORITY_INVALID` errors in your browser.

To do so, you can run the following command from the project root directory **after starting the app and caddy server**:

```shell
sudo yarn caddy:trust-ca
```

This command will add the Caddy Local CA Certificate to your system's list of trusted certificates (only works on MacOS for now). It needs sudo rights for that.

<br />

### Opening in the Browser

With Docker running, navigate to the staging URL provided below.

<br />

#### Staging

<https://staging.geyser.fund/>

<br />

### Testing

We have end-to-end tests with Cypress. To run the tests locally, we'd need to create a `cypress.env.json` file in the root directory, with the following key values:
```shell
APP_URL,
CONTRIBUTOR_LND_ENDPOINT,
CONTRIBUTOR_LND_ADMIN_MACAROON_HEX,
MINE_BLOCK_ADDRESS,
BITCOIND_ENDPOINT,
BITCOIND_AUTH
```

then
```shell
make test
```


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/geyserfund/geyser-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br />


<!-- CONTRIBUTING -->
## Contributing

Contributions to Geyser are always welcome!

- 📥 Pull requests and 🌟 Stars are always welcome.

- Read our [contributing guide](/docs/CONTRIBUTING.md) and [coding guidelines](/docs/CODING_GUIDELINES.md) to get started,
- Read our [style guide](/docs/STYLE_GUIDE.md) to know more about style considerations.
- Read our [Architecture guide](/docs/ARCHITECTURE.md) to learn more about the project.

  or find us on [Discord](https://discord.gg/PgBQRxbtgJ), we will take the time to guide you.

<br />

<!-- Sitemap -->
## Sitemap

  You can generate a sitemap by running `node generate-sitemap.js`.  This will create a sitemap.xml file in the public directory.  You can also modify the generate-sitemap file to include additional routes easily.

<!-- License -->
## License

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  [GNU General Public License](/LICENSE.md) for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

* Stelios Rammos - [@steliosats](https://twitter.com/steliosats) - stelios@geyser.fund
* Sajal Dulal - [@sajald77](https://twitter.com/sajald77) - sajal@geyser.fund

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [React Icons](https://react-icons.github.io/react-icons/search)
* [Img Shields](https://shields.io)
* [Badges Pages](https://badges.pages.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/geyserfund/geyser-app.svg?style=for-the-badge
[contributors-url]: https://github.com/geyserfund/geyser-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/geyserfund/geyser-app.svg?style=for-the-badge
[forks-url]: https://github.com/geyserfund/geyser-app/network/members
[stars-shield]: https://img.shields.io/github/stars/geyserfund/geyser-app.svg?style=for-the-badge
[stars-url]: https://github.com/geyserfund/geyser-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/geyserfund/geyser-app.svg?style=for-the-badge
[issues-url]: https://github.com/geyserfund/geyser-app/issues
[license-shield]: https://img.shields.io/badge/license-GPLv3-blue?style=for-the-badge
[license-url]: https://github.com/geyserfund/geyser-app/LICENSE.md

[product-screenshot]: images/screenshot.png

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge
[Chakra.ui]: https://img.shields.io/badge/Chakra%20UI-319795?logo=chakraui&logoColor=fff&style=for-the-badge
[React-url]: https://reactjs.org/
[Chakra-url]: https://chakra-ui.com/
[Graph.ql]: https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=fff&style=for-the-badge
[GraphQL-url]: https://graphql.org/
[Typescript.ts]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge
[Typescript-url]: https://www.typescriptlang.org/
[React.router]: https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=for-the-badge
[ReactRouter-url]: https://reactrouter.com/en/main
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=for-the-badge
[linkedin-url]: https://www.linkedin.com/company/geyserfund/
[discord-shield]: https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=fff&style=for-the-badge
[discord-url]: https://discord.gg/JxCuVHv9
[telegram-shield]: https://img.shields.io/badge/Telegram-26A5E4?logo=telegram&logoColor=fff&style=for-the-badge
[telegram-url]: https://t.me/geyserfund
[x-shield]: https://img.shields.io/badge/X-000?logo=x&logoColor=fff&style=for-the-badge
[x-url]: https://twitter.com/geyserfund

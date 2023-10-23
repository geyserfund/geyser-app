<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://geyser.fund">
    <img src="https://storage.googleapis.com/geyser-projects-media/app/logo-name-brand.svg" alt="Logo" width="400">
  </a>

  <h3 align="center">Transform ideas into real-life projects</h3>

  <p align="center">
    Geyser is a bitcoin-native crowdfunding platform where you can fund project ideas with the support from global communities.
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

<br />
<div align="center">
    <h2>Where great ideas find great communities</h2>
    <h3>Some of the most successful projects and brands have launched on Geyser</h3>
    <img src="https://storage.googleapis.com/geyser-projects-media/images/geyser-about-projects-banner-image.png" alt="geyser Screenshot">
</div>

#### Crowdfunding without borders
Traditional crowdfunding platforms operate in only 30 or so countries. Thanks to Bitcoin, Geyser makes crowdfunding accessible to people all around the world.

#### Let the Sats and rewards flow
Most project creators on Geyser reach their goals by selling merch related to their ideas, or giving perks and Nostr badges as a reward for supporters. Funders are bullish!

#### Bitcoin made super easy
Getting your project up and running only takes a few minutes. And we make it easy for funders too, so they can fund on-chain, lightning, WebLN and LNURL. All funds go straight to your single wallet.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* [![Typescript][Typescript.ts]][Typescript-url]
* [![ChakraUI][Chakra.ui]][Chakra-url]
* [![GraphQL][Graph.ql]][GraphQL-url]
* [![React Router][React.router]][ReactRouter-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

#### Yarn

We use yarn as a dependency manager, install yarn if not already installed
- `npm install --global yarn`

#### Docker ( optional )

We can use `docker` and `docker compose` for local development of the `geyser-app`.
If you prefer using docker for devlopment, make sure to have them installed on your local development machine, see [here](https://docs.docker.com/get-docker/).

### Installing Dependencies

Clone the repo, get into the repo directory and run:
```shell
yarn
```

### Environment Variables

The app requires some environment variables to be set. We provide an `example.env` file that you can copy to the a local `.env` file:

```shell
cp .env.example .env
```

From there, populate the new file with the correct values. You have three development environment options, detailed below. It is recommended to use the staging API for most development tasks.

Optionally create `.env.staging` file, that could be tried out for staging development

### Running the App Locally

#### Option 1 (DOCKER): use the staging API

Make sure to complete the instructions described in [Hosts Configuration](#hosts-configuration), before proceesing using this method.

Currently, the staging API is the only way to get a functional authentication flow in standalone `geyser-app` development environment.

To use the staging API, fill in the following value in the `.env` file:

```shell
[OPTION A: STAGING]
REACT_APP_API_ENDPOINT=https://api.staging.geyser.fund
```

Start the server:
```shell
make dev-staging
```

#### Option 2 (DOCKER): use the GraphQL-Faker config

If you do not require a functional authentication flow for this task, you may use this option.

```shell
[OPTION B: GRAPHQL_FAKER]
REACT_APP_API_ENDPOINT=https://api.dev.geyser.fund
APOLLO_KEY=<your Apollo Studio API key>
```

if you don't have an `APOLLO_KEY` yet. Please <a href="#contact">Contact us</a>

Start the server:
```shell
make dev-faker
```

#### Option 3: use both local server and staging API interchangably

Many at times we prefer using staging API while sometimes we prefer the local server. In such cases we can setup to use them interchangably.

1. Create the normal `.env` file, which contains the values for local server. Refer to the `.env.example` and use `Configuration 3-A`

Start the server:
```shell
yarn dev
```

2. Create a new file `.env.staging` this would have the values to use the staging API. Refer to the `.env.example` and use `Configuration 3-B`.

Start the server:
```shell
yarn dev:stage
```

#### Docker

If you run into problems running the app through make command, you can run the app by running the following command in the project directory, as long as one of the docker configuration above ( Option 1 or 2) is satisfied.

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

### Hosts Configuration

#### Staging API

In order for the requests to go through to the staging backend API, you will need to add the following line to your `/etc/hosts` file:

```shell
127.0.0.1 staging.geyser.fund
```

This makes sure that you are able to make requests to the staging API from your local development environment with encountering CORS errors.

#### GraphQL Faker

If running against the GraphQL Faker server, you'll also need these in the same `/etc/hosts` file:

```shell
127.0.0.1 dev.geyser.fund
127.0.0.1 api.dev.geyser.fund
```

### Trusting Caddy Local CA Certificate

We are using Caddy as a reverse proxy to serve the local development app over HTTPS. This means that you will need to trust the Caddy Local CA Certificate in order to avoid any `ERR_CERT_AUTHORITY_INVALID` errors in your browser.

To do so, you can run the following command from the project root directory **after starting the app and caddy server**:

```shell
sudo yarn caddy:trust-ca
```

This command will add the Caddy Local CA Certificate to your system's list of trusted certificates (only works on MacOS for now). It needs sudo rights for that.

### Opening in the Browser

With Docker running, navigate to the URL that's appropriate for the development-environment configuration in your `.env` file:

#### Staging

<https://staging.geyser.fund/>

#### GraphQL Faker

<https://dev.geyser.fund/>

> Make sure to also browse to <https://api.dev.geyser.fund/> and accept the certificate there.
>
> This will allow you to get around any `ERR_CERT_AUTHORITY_INVALID` errors that may be thrown in your browser.

> See [the docs on `GraphQL Faker Tips & Tricks`](./docs/faker/TipsAndTricks.md) for more useful tidbits of information on running/developing the app against Faker.

<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

[Check out the contribution guidelines](/CONTRIBUTING.md)




<!-- LICENSE -->
## License

Distributed under the GPLv3 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Stelios Rammos - [@steliosats](https: https://twitter.com/steliosats) - stelios@geyser.fund
Sajal Dulal - [@sajald77](https://twitter.com/sajald77) - sajal@geyser.fund

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
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/badge/License-GPLv3-blue.svg&style=flat-square
[license-url]: https://github.com/geyserfund/geyser-app/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat-square
[Chakra.ui]: https://img.shields.io/badge/Chakra%20UI-319795?logo=chakraui&logoColor=fff&style=flat-square
[React-url]: https://reactjs.org/
[Chakra-url]: https://chakra-ui.com/
[Graph.ql]: https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=fff&style=flat-square
[GraphQL-url]: https://graphql.org/
[Typescript.ts]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat-square
[Typescript-url]: https://www.typescriptlang.org/
[React.router]: https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=flat-square
[ReactRouter-url]: https://reactrouter.com/en/main

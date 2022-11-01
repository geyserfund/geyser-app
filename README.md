# Geyser App Frontend 🌊

The Geyser Front-End

## Project Setup

### Installing Dependencies

```shell
yarn
```

### Prerequisites

We use `docker` and `docker compose` for local development of the `geyser-app`.

Make sure to have them installed on your local development machine, see [here](https://docs.docker.com/get-docker/).

### Environment Variables

The app requires some environment variables to be set. We provide an `example.env` file that you can copy to the a local `.env` file:

```shell
cp .env.example .env
```

From there, populate the new file with the correct values. You have two development environment options:

#### Option A: use the staging API

Currently, the staging API is the only way to get a functional authentication flow in standalone `geyser-app` development environment.

To use the staging API, fill in the following value in the `.env` file:

```shell
[OPTION A: STAGING]
REACT_APP_API_ENDPOINT=https://api.staging.geyser.fund
```

Then, complete the instructions described in [Hosts Configuration](#hosts-configuration).

#### Option B: use the GraphQL-Faker config

If you do not require a functional authentication flow for this task, you may use this option.

```shell
[OPTION B: GRAPHQL_FAKER]
REACT_APP_API_ENDPOINT=https://api.dev.geyser.fund
APOLLO_KEY=<your Apollo Studio API key>
```

[Contact us](email:admin@geyser.fund) if you don't have an `APOLLO_KEY` yet.

### Hosts Configuration

In order for the requests to go through to the staging backend API, you will need to add the following line to your `/etc/hosts` file:

```shell
127.0.0.1 staging.geyser.fund
```

If running against the GraphQL Faker server, you'll also need these in the same `/etc/hosts` file:

```shell
127.0.0.1 dev.geyser.fund
127.0.0.1 api.dev.geyser.fund
```

## Running the App Locally

### Starting Docker

After completing the above steps, you can run the app by running the following command in the project directory:

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

### Opening in the Browser

With Docker running, navigate to the URL that's appropriate for the development-environment configuration in your `.env` file:

#### Staging

<https://staging.geyser.fund/>

#### GraphQL Faker

<https://dev.geyser.fund/>

> Make sure to also browse to <https://api.dev.geyser.fund/> and accept the certificate there.
>
> This will allow you to get around any `ERR_CERT_AUTHORITY_INVALID` errors that may be thrown in your browser.

> See [the docs on `GraphQL Faker Tips & Tricks`](./faker/docs/TipsAndTricks.md) for more useful tidbits of information on running/developing the app against Faker.

### Debugging on a Mobile Device

#### Useful Links for Chrome

- <https://developer.chrome.com/docs/devtools/remote-debugging/>
- <https://developer.chrome.com/docs/devtools/remote-debugging/local-server/>

#### Useful Links for Safari

- <https://www.browserstack.com/guide/how-to-debug-on-iphone>

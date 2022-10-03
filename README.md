# Geyser App

The Geyser Front-End

## Project Setup

### Installing Dependencies

```shell
yarn install
```

### Pre-requisites

We use `docker` and `docker compose` for local development of the `geyser-app`.

Make sure to have them installed on your local development machine, see [here](https://docs.docker.com/get-docker/).

### Hosts Configuration

We temporarily use the staging API as a quick-start backend for contributors of the `geyser-app`. In order for the
requests to go through, you will need to add the following line to your `/etc/hosts` file:

```shell
127.0.0.1 staging.geyser.fund
```

### Environment Variables

The app requires some environment variables to be set. We provide an `example.env` file that you can copy to the a local `.env` file:

```shell
cp .env.example .env
```

From there, populate the new file with the following values:

```shell
REACT_APP_ENV=development
REACT_APP_API_ENDPOINT=https://api.staging.geyser.fund
APOLLO_KEY=<you Apollo Studio API key>
```

[Contact us](email:admin@geyser.fund), if you don't have an `APOLLO_KEY` yet.

## Running the App Locally

### Starting Docker

After completing the above steps, you can run the app by running the following command in the project directory:

```shell
docker compose up -d
```

Or, if you are running an older version of docker and have docker-compose installed separately:

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

With Docker running, navigate to <http://staging.geyser.fund/>.

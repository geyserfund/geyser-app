# Geyser App

The Geyser Front-End

## Development

### Installing Dependencies

```shell
yarn install
```

```shell
yarn dev
```

### Pre-requisites

We use `docker` and `docker compose` for local development of the `geyser-app`.

Make sure to have them installed on your local development machine, see [here](https://docs.docker.com/get-docker/).

### Hosts configuration

We temporarily use the staging API as a quick-start backend for contributors of the `geyser-app`. In order for the
requests to go through, you will need to add the following line to your `/etc/hosts` file:

```
yarn install
```

### Environment Variables

The app requires some environment variables to be set. We provide an `example.env` file that you can copy to the a local `.env` file:

```shell
cp .env.example .env
```

From there, populate the new file with the following values:

```shell
REACT_APP_ENV=development
REACT_APP_API_ENDPOINT=<API_URL>
```

## Environment Variables

### Front-End

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

## `Using ESLint in VSCode`

**Note: This is to be used for consistent code formatting and adhering to certain coding practice!**

step 1: Make sure you have eslint extension installed in your vscode environment.

step 2: Add these variables to your VScode settings

```json
"editor.formatOnSave": true,

// turn it off for JS and JSX, we will do this via eslint
"[javascript]": {
  "editor.formatOnSave": false
},

"[javascriptreact]": {
  "editor.formatOnSave": false
},

// show eslint icon at bottom toolbar
"eslint.alwaysShowStatus": true,

// tell the ESLint plugin to run on save
"editor.codeActionsOnSave": {
  "source.fixAll": true
}
```

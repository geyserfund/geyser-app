# Geyser App

Repository containing all source code for the `geyser-app` frontend.

## Local Development


### Pre-requisites


We use `docker` and `docker compose` for local development of the `geyser-app`.

Make sure to have them installed on your local development machine, see [here](https://docs.docker.com/get-docker/).

### Hosts configuration


We temporarily use the staging API as a quick-start backend for contributors of the `geyser-app`. In order for the 
requests to go through, you will need to add the following line to your `/etc/hosts` file: 

```
127.0.0.1 api.staging.geyser.fund
```

### Environment Variables

The app requires some environment variables to be set. We provide an `example.env` file, copy to the file content to a `.env` file before populating the following values:

```
REACT_APP_API_ENDPOINT=https://api.staging.geyser.fund
REACT_APP_ENV=development
```

### Running the app

After completing the above steps, you can run the app by running the following command in the project directory:

```
docker compose up -d
```

Or, if you are running an older version of docker and have docker-compose installed separately:

```
docker-compose up -d
```

To see the react app logs use the following command:

```
docker compose logs -f geyser-app
```

or 
```
docker-compose logs -f geyser-app
```


## `Use eslint in VS code`

**Note: This is to be used for consistent placing and adering to certain coding practice!**

step 1: Make sure you have eslint extension installed in your vscode environment.

step 2: Add these variables to your VScode settings

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
},

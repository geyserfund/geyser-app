## Available Scripts

In the project directory, you can run:

```
yarn install
```

```
yarn dev
```

## Environment Variables

# Front-End

REACT_APP_API_ENDPOINT=<API_URL>
NODE_ENV=<environment>

### `Use eslint in VS code`

**Note: This is to be used for consistent placing and adering to certain coding practice !**

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

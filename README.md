## Description:
React Native app for browsing the [Unsplash](https://unsplash.com/)

## How to run localy:

Download or clone master branch.
Inside of `/src/config.json` file place your Unsplash app client ID ([Unsplash Docs](https://unsplash.com/documentation#creating-a-developer-account)), like this:

```
{
  "url": "https://api.unsplash.com/",
  "client_id": "ADD_YOUR_CLIENT_ID_HERE"
}
```

In the root project directory run:

```
npm install
react-native run-ios
```

This runs the app in development mode on iOS simulator (if you have one).

## Contributing:

Before making PR, make sure eslint and flow checks are passing:

```
npm run eslint
npm run flow-check
```
# Unofficial unsplash.com Mobile App
[![CircleCI](https://circleci.com/gh/zarcode/unsplashapp/tree/master.svg?style=shield)](https://circleci.com/gh/zarcode/unsplashapp/tree/master)
## Description:
React Native app for browsing [Unsplash](https://unsplash.com/) photos.

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

This runs the app on iOS simulator (if you have one). You can run it also on android of course.

## Contributing:

Before making PR, run:
```
npm run prettier
```
to make sure code is pretty and respects eslint configuration.

Also, make sure eslint, flow checks and tests are passing:

```
npm run eslint
npm run flow-check
npm test
```
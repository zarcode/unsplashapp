# Unofficial unsplash.com Mobile App
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/zarcode/unsplashapp/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/zarcode/unsplashapp/tree/master.svg?style=shield)](https://circleci.com/gh/zarcode/unsplashapp/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/zarcode/unsplashapp/badge.svg)](https://coveralls.io/github/zarcode/unsplashapp)
## Description:
React Native app for browsing [Unsplash](https://unsplash.com/) photos.

## Android build:
[![Get it on google play](https://camo.githubusercontent.com/59c5c810fc8363f8488c3a36fc78f89990d13e99/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f696d616765732f67656e657269632f656e5f62616467655f7765625f67656e657269632e706e67)](https://play.google.com/store/apps/details?id=com.zarcode.splashy)

## How to run localy:

Download or clone master branch.
Make `/src/config.json` file and inside of it place your Unsplash app client ID ([Unsplash Docs](https://unsplash.com/documentation#creating-a-developer-account)), like this:

```
{
  "keys": [ "ADD_YOUR_CLIENT_ID_HERE" ]
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
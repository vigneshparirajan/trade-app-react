# Mantine create-react-app template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Mantine](https//mantine.dev).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

## package.json

<!-- "devDependencies": {
  "@babel/core": "^7.20.12",
  "@babel/plugin-transform-runtime": "^7.19.6",
  "@babel/preset-env": "^7.20.2",
  "@babel/preset-react": "^7.18.6",
  "@babel/preset-typescript": "^7.18.6",
  "@babel/runtime": "^7.20.7",
  "@types/jest": "^29.2.5",
  "jest": "^29.3.1",
  "jest-environment-jsdom": "^29.3.1"
} -->

## babel.config.js

<!-- module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
}; -->

## package.json

<!-- "scripts": {
"test": "jest --watchAll",
"prod": "react-scripts build && serve -s build"
} -->

## index.test.tsx

<!-- /** @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect'; -->

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

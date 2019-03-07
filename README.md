This project was bootstrapped with a work-in-progress [Redux Framework](https://gitlab.com/jblossomweb/crats-redux-framework).<br>
[Redux Framework](https://gitlab.com/jblossomweb/crats-redux-framework) was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Demo Deployments:

Lambda API:<br>
[https://2q8uy6j06j.execute-api.us-east-1.amazonaws.com/dev/players](https://2q8uy6j06j.execute-api.us-east-1.amazonaws.com/dev/players)<br>

Client:<br>
[https://fwi-poker-leaderboard.firebaseapp.com/](https://fwi-poker-leaderboard.firebaseapp.com/)<br>

Storybook:<br>
[https://fwi-poker-storybook.firebaseapp.com/](https://fwi-poker-storybook.firebaseapp.com)

# Quick Start

#### mongodb on port 27017
#### serverless on port 4000

```
git clone git@github.com:jblossomweb/fwi-poker-leaderboard-serverless.git
cd fwi-poker-leaderboard-serverless
docker-compose up -d
cp .env.sample .env
npm install && npm start
```

#### client on port 3000

```
git clone git@gitlab.com:jblossomweb/fwi-poker-leaderboard-client.git
cd fwi-poker-leaderboard-client
npm install && npm start
```

#### storybook on port 9001

```
npm run storybook
```

#### test runner

```
npm test
```

## All Available Scripts

In the project directory, you can run:

### `npm install` / `yarn`

Install dependencies.<br>
Do this first.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm start` / `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm lint` / `yarn lint`

Launches the typescript linter.

### `npm test` / `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage` / `yarn run coverage`

Launches the test runner and generates a coverage report.

### `npm run storybook` / `yarn run storybook`

Runs the component storybook in isolation from the app.<br>
Open [http://localhost:9001](http://localhost:9001) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build-storybook` / `yarn run build-storybook`

Builds the storybook to the `.storybook/build` folder.<br>
It correctly bundles the storybook and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your storybook is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build` / `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject` / `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

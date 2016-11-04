# Front-End Starter

React, Redux, React-Router, Eslint via Webpack and

SASS, PostCSS, BrowserSync via Gulp.

### Getting Start ###
```
  > npm install
  > npm start
```

### Using Hot Module Replacement for Javascript Development ###
Auto refresh browser after change is OK, but HMR is still some problem.
```
  > npm run dev
  then go http://localhost:8080
```

### Using BrowserSync for Style Development ###
```
  > gulp
  then go http://localhost:3000
```

### We Could Use Hot-Dev-Server and BrowserSync on the Same Time ###
```
  > npm run dev-server
  > command + T (open new window of terminal with same folder)
  > gulp
  it would automatically open http://localhost:3000 in default browser
```

### Deploy: Remember to Compile Production ###
```
  > webpack
  > gulp production
```

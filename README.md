# ireNotion REST API

This is a REST API that provides a server to the ireNotion app, you can find it here: https://github.com/irene-pr/ireNotion-front. It has been developed with Express, Typescript, Node, Eslint, Firebase and jsonwebtoken.

It's been fully unit tested with Jest. I've tested the routes with cypress for the first time with good results, but as of now the tests need a refactor to meet my standards. I will probably test routes with cypress (login, get and update) and supertest (post and delete) alternatively. I've used the library express-validation to validate the body of the routes. I've made factories to test with better accuracy with the libraries fishery and faker.

I've added husky and github workflows to help me code better.

## Commands to try out the project

```
npm install
```

### Runs the server

```
npm run start
```

### Compiles Typescript

```
npm run ts-compile
```

### Run your unit tests

```
npm run test
```

### Run your route tests (they're still in progress)

To open the server to run the tests:

```
npm run start-cy
```

To run the tests:

```
npm run cy
npm run cy-open
```

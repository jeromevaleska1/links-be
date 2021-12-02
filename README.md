# link shortener app
consist of DB (PostgreSQL), angular FE and NestJS(node) BE

## DEMO
In case you don't feel like do any local install app is also deployed [here](https://tier-fe.herokuapp.com/)

### Documentation
Api documentation available [here](https://warm-everglades-74053.herokuapp.com/api/) or when local BE is up and running on http://localhost:3000/api 

### PG database
before running app locally please make sure you have *docker* installed 
and run the following 
`docker run -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

### FE
please run
`npm i -g @angular/cli`
`ng serve`
from FE folder

app will be available at `localhost:4200`

### BE
from BE folder
please run `yarn`
`yarn start`

BE will run on `localhost:3000`
`

### tests
`yarn test` to run unit tests
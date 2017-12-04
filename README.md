to install packages
`npm i` 
it will build automatically

redis and mysql should be provided

configurations are:

`server/config/env/development.js`

to lounch development mode:

`npm start`

to launch production:

1) fulfill `server/config/env/production.js`    (development.js is an example)
2) run `node dist/index.js`
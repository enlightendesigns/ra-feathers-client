# React Admin Feathersjs client

[Feathers](https://feathersjs.com/) data and authentication provider to be used with [react admin](https://github.com/marmelab/react-admin)

## Features

- GET_LIST
- GET_ONE
- GET_MANY
- GET_MANY_REFERENCE
- CREATE
- UPDATE
- ~~UPDATE_MANY~~ (not supported)
- DELETE
- DELETE_MANY
- AUTH_LOGIN
- AUTH_LOGOUT
- AUTH_CHECK
- AUTH_ERROR
- ~~AUTH_GET_PERMISSION~~ (not supported, see [permission module](https://github.com/marmelab/aor-permissions)

## Actual installation
```bash
git clone https://git.room9.co.nz/Room9/ra-feathers-client.git
cd ra-feathers-client
npm run build
npm link

cd /path/to/your/project
npm link ra-feathers-client
```

## Installation (Not available yet)
```bash
npm install --save ra-feathers-client
```
or
```bash
yarn add ra-feathers-client
```

## Usage
```javascript
import React from 'react'
import feathers from '@feathersjs/client'
import auth from '@feathersjs/authentication-client'
import rest from '@feathersjs/rest-client'
import { feathersDataProvider, feathersAuthProvider } from 'ra-feathers-client'

const host = 'http://localhost:3030'
const restClient = rest(host)
const client = feathers()
// .configure(auth({})) <== enable authentication
  .configure(restClient.fetch(window.fetch))

class App extends React.Component {
  render() {
    return (
      <Admin 
        dataProvider={feathersDataProvider(client)}
        authProvider={feathersAuthProvider(client)}
        ...
      >
       ...
      </Admin>
    )
  }
}

export default App
  
```

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

## Installation
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
import { feathersDataProvider } from 'ra-feathers-client'

```

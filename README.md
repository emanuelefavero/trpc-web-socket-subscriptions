# tRPC

This is a cheat sheet repo for tRPC, a library for building typesafe APIs between server and client

> Note: tRPC main features work with TypeScript

## Installation

- clone repo and `cd` into it
- `cd` into `server` and run `npm install`
- `cd` into `client` and run `npm install`

## Running

- `cd` into `server` and run `npm run dev`
- `cd` into `client` and run `npm run dev`

- visit `http://localhost:5173/` to see the client

## Setup a new project

tRPC works well when you have a monorepo with a `server` and `client` folder on the same levelf

> Note: you can setup a new tRPC project with [create-t3-app](https://create.t3.gg/)

OR

### Setup server folder

- run `npm i @trpc/server cors express zod`
- run `npm i -D @types/cors @types/express @types/node nodemon ts-node typescript`
- setup `typescript` with `tsc --init`
- add `dev` script to `package.json`:

```json
"dev": "nodemon SERVER_NAME.ts"
```

- start developing your server

> Note: see this repo project for a working example

### Setup client folder

> Note: You can use many frameworks as the client, but tRPC works best with t3, Next.js and React

- run `npm i @trpc/client`
- run `npm i -D typescript`
- setup `typescript` with `tsc --init`
- add `dev` script to `package.json`:

```json
"dev": "YOUR CLIENT START COMMAND"
```

- start developing your client

> Note: see this repo project for a working example

## Resources

- [tRPC.io](https://trpc.io/)
- [tRPC Docs](https://trpc.io/docs)
- [tRPC Quickstart](https://trpc.io/docs/quickstart)
- [create-t3-app](https://create.t3.gg/)

## License

- [MIT](LICENSE.md)

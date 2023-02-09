# tRPC Web Socket Subscriptions

This is a cheat sheet repo for setting up tRPC with [WebSocket Subscriptions](https://trpc.io/docs/subscriptions).

> Note: tRPC is a library for building typesafe APIs between server and client (tRPC main features work with TypeScript)

&nbsp;

---

&nbsp;

## Table of Contents

- [Web Sockets](#web-sockets)
- [Web Socket Subscriptions](#web-socket-subscriptions)
- [Installation](#installation)
- [Running](#running)
- [Setup a new project](#setup-a-new-project)
  - [Setup server folder](#setup-server-folder)
  - [Setup client folder](#setup-client-folder)
- [Resources](#resources)
- [License](#license)

&nbsp;

---

&nbsp;

## Web Sockets

[Web Sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) are a protocol for bi-directional, real-time communication between a client (such as a web browser) and a server. They are commonly used to build real-time applications, such as online games, chat applications, and collaborative editing tools.

## Web Socket Subscriptions

Web Socket Subscriptions are a way to use Web Sockets to subscribe to data changes on the server.

&nbsp;

---

&nbsp;

## Installation

> Note: The installation will be the same as my [trpc repo](https://github.com/emanuelefavero/trpc) apart from `npm i ws` and `npm i -D @types/ws` command which installs the WebSocket library on the server

- clone repo and `cd` into it
- `cd` into `server` and run `npm install`
- `cd` into `client` and run `npm install`

## Running

- `cd` into `server` and run `npm run dev`
- `cd` into `client` and run `npm run dev`

- visit `http://localhost:5173/` to see the client

&nbsp;

---

&nbsp;

## Setup a new project

tRPC works well when you have a monorepo with a `server` and `client` folder on the same levelf

> Note: you can setup a new tRPC project with [create-t3-app](https://create.t3.gg/)

OR

### Setup server folder

- run `npm i @trpc/server cors express zod`
- **run `npm i ws` to install the WebSocket library**
- **run `npm i -D @types/ws` to install types for the WebSocket library**
- run `npm i -D @types/cors @types/express @types/node`
- nodemon ts-node typescript`
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

&nbsp;

---

&nbsp;

## Resources

- [tRPC.io](https://trpc.io/)
- [tRPC Docs](https://trpc.io/docs)
- [tRPC Quickstart](https://trpc.io/docs/quickstart)
- [create-t3-app](https://create.t3.gg/)

## License

- [MIT](LICENSE.md)

&nbsp;

---

&nbsp;

[**Go To Top &nbsp; ⬆️**](#trpc-web-socket-subscriptions)

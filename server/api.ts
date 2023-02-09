import express from 'express'
import cors from 'cors'

// IMPORT TRPC SERVER
// npm i @trpc/server
import { createExpressMiddleware } from '@trpc/server/adapters/express'

// * IMPORT TRPC WEBSOCKET SERVER (WSS)
import { applyWSSHandler } from '@trpc/server/adapters/ws'

// * IMPORT WEBSOCKET
import ws from 'ws'

// IMPORT TRPC ROUTER
import { appRouter } from './routers' // <- ./routers/index.ts

// IMPORT CONTEXT
import { createContext } from './context'

// --------------------------------------------

const app = express()
app.use(cors({ origin: 'http://localhost:5173' })) // cors for client

// Add the TRPC middleware to express (express specific)
// http://localhost:3000/trpc
app.use(
  // Create route for trpc
  '/trpc',
  createExpressMiddleware({
    // Pass the router
    router: appRouter, // * <- router
    // Add context to the server (req.ctx)
    createContext, // * <- context
  })
)

// * ADD A WEB SOCKET LISTENER
const server = app.listen(3000) // * <- server

applyWSSHandler({
  wss: new ws.Server({ server }), // * <- pass the server
  router: appRouter, // * <- pass the router
  createContext, // * <- pass the context
})

// export types for client
export type AppRouter = typeof appRouter

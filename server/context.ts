// import { CreateExpressContextOptions } from '@trpc/server/adapters/express'

// --------------------------------------------

// Create context for the server (req.ctx), (express specific adapters)
// export function createContext({ req, res }: CreateExpressContextOptions) {
// * Web Sockets don't have req or res
export function createContext() {
  return {
    // req,
    // res,
    isAdmin: true, // ! hard coded for demo
    // ... HERE YOU CAN ADD ANYTHING YOU WANT TO THE CONTEXT (useful for authentication)
  }
}

// ? Remember to import this in server/api.ts and trpc.ts

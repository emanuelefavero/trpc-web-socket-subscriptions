import { CreateExpressContextOptions } from '@trpc/server/adapters/express'

// --------------------------------------------

// * Create context for the server (req.ctx), (express specific adapters)
export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req, // ! only include those if you need them
    res,
    isAdmin: true, // ! hard coded for demo
    // ... HERE YOU CAN ADD ANYTHING YOU WANT TO THE CONTEXT (useful for authentication)
  }
}

// ? Remember to import this in server/api.ts and trpc.ts

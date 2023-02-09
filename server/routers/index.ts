// * IMPORT TRPC INITIALIZER
import { adminProcedure, t } from '../trpc'

// * Import other routers
import { userRouter } from './users'

// --------------------------------------------

// * Define the router and its procedures (endpoints)
export const appRouter = t.router({
  // http://localhost:3000/trpc/sayHi
  sayHi: t.procedure.query(() => {
    return 'Hi from trpc server'
  }),
  // http://localhost:3000/trpc/logToServer
  // http://localhost:3000/trpc/logToServer?input=hello
  logToServer: t.procedure
    .input((v) => {
      if (typeof v === 'string') return v

      throw new Error('Invalid input: expected string')
    })
    .mutation((req) => {
      console.log(`Client said: ${req.input}`)
      return true
    }),

  // * Admin only route (defined in trpc.ts)
  // http://localhost:3000/trpc/secretData
  secretData: adminProcedure.query(({ ctx }) => {
    console.log(ctx.user)
    return 'super secret admin data'
  }),

  // * Create a router
  // http://localhost:3000/trpc/users
  users: userRouter,
})

import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { createContext } from './context'

// --------------------------------------------

// Initialize TRPC
export const t = initTRPC
  // Pass the context
  .context<inferAsyncReturnType<typeof createContext>>()

  .create()

// ````````````````````````````````````````````

// * create a middleware that checks if the user is an admin
const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  // ! change isAdmin to true or false in context.ts to see the difference
  if (!ctx.isAdmin) {
    /**
     * @desc TRPCError can be used to return a specific error code
     * @see https://trpc.io/docs/error-handling
     */
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    // * you can modify the context here
    ctx: {
      user: {
        // * pass the user id to the context
        id: '123', // ! hard coded for now
      },
    },
  })
})

export const adminProcedure = t.procedure.use(isAdminMiddleware)

// --------------------------------------------

// NOTE: We do this in a separate file so that we initialize TRPC only once
// ? infer means to figure out the type

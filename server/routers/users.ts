import { t } from '../trpc'
import { z } from 'zod'

// * IMPORT observable
import { observable } from '@trpc/server/observable'

// * IMPORT EventEmitter from the stream library which comes from node
import { EventEmitter } from 'stream'

// --------------------------------------------

// * INITIALIZE eventEmitter
const eventEmitter = new EventEmitter()

// Define procedures for this router
// the input type should be an object with a string called id (it uses zod for type checking)
const userProcedure = t.procedure.input(z.object({ userId: z.string() }))

// Create a router and assign procedures to routes
export const userRouter = t.router({
  // http://localhost:3000/trpc/users/get
  get: userProcedure.query(({ input }) => {
    return { id: input.userId }
  }),

  // http://localhost:3000/trpc/users/update
  update: userProcedure
    // NOTE: You still need to pass the userId with the name to update on the client (since this is still userProcedure)
    .input(z.object({ name: z.string() }))
    // A mutation is a procedure that changes data
    .mutation((req) => {
      // Log context
      // console.log(req.ctx.isAdmin)

      // Log on the server
      console.log(
        `Updating user ${req.input.userId} with name ${req.input.name}`
      )

      // * EMIT AN EVENT - pass data
      eventEmitter.emit('update', req.input.userId) // ? <- update event

      return { id: req.input.userId, name: req.input.name }
    }),

  // * SETUP WEB SOCKET SUBSCRIPTIONS - listen for changes
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      // * LISTEN FOR update EVENT
      eventEmitter.on('update', emit.next) // ? <- update event

      // * CLEAN UP WHEN THE CLIENT DISCONNECTS
      return () => {
        eventEmitter.off('update', emit.next)
      }
    })
  }),
})

// NOTE: Make sure to import this router in server/routers/index.ts

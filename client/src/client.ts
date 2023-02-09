// IMPORT TRPC CLIENT
// npm i @trpc/client
import {
  createTRPCProxyClient,
  httpBatchLink,
  // loggerLink,

  // * IMPORT WEB SOCKET CLIENT, WEB SOCKET LINK AND splitLink
  createWSClient,
  wsLink,
  splitLink,
} from '@trpc/client'
// IMPORT TYPES we created in server/api.ts
import { AppRouter } from '../../server/api'

// --------------------------------------------

// * CREATE A WEB SOCKET CLIENT
const wsClient = createWSClient({
  // * put ws instead of http on the url
  url: 'ws://localhost:3000/trpc',
})

// Create a client
const client = createTRPCProxyClient<AppRouter>({
  // httpBatchLink batches multiple requests into one - useful for performance
  links: [
    // loggerLink logs all http requests to the client console (useful for debugging)
    // loggerLink(),

    // * SETUP A WEB SOCKET CONNECTION
    // ? splitLink allows you to create one link or another based on a condition
    splitLink({
      // * only use the web socket link if the operation is a subscription
      condition: (operation) => {
        return operation.type === 'subscription'
      },

      true: wsLink({
        client: wsClient, // * <- use the web socket client
      }),

      // * use the httpBatchLink for everything else (query, mutation)
      false: httpBatchLink({
        url: 'http://localhost:3000/trpc',

        // Pass custom http headers
        // headers: { Authorization: 'TOKEN' },
      }),
    }),
  ],
})

// * UPDATE THE USER ON CLICK (MUTATION) - this will also trigger the subscription thanks to the web socket setup we made
document.addEventListener('click', () => {
  client.users.update.mutate({ userId: '123', name: 'Jack' })
})

// Make requests to the server
async function main() {
  // * CALL THE SUBSCRIPTION
  // ? log the id to the console whenever the user is updated
  client.users.onUpdate.subscribe(undefined, {
    // ? <- undefined because we don't need to pass any data
    onData: (id) => {
      console.log('Updated', id)
    },
  })

  // * CLOSE THE SUBSCRIPTION
  // ? unsubscribe = stop listening to the subscription
  // connection.unsubscribe()
  // NOTE: You need to assign the subscription call above (63) to a variable to be able to unsubscribe

  // ? close = close the web socket connection
  wsClient.close()

  document.body.innerHTML = 'Check console for results' // !
  // http://localhost:3000/trpc/sayHi
  // const result = await client.sayHi.query()
  // console.log(result)
  // const result2 = await client.users.get.query({ userId: '123 ' })
  // console.log(result2)
  // const result3 = await client.users.update.mutate({
  //   userId: '123',
  //   name: 'Jack',
  // })
  // console.log(result3)
  // const result4 = await client.secretData.query()
  // console.log(result4)
  // http://localhost:3000/trpc/logToServer
  // await client.logToServer.mutate('hello from client') // check server console
}

main()

// --------------------------------------------

// query vs mutation
// query: read-only
// mutation: changes data

// TIP: The nice thing about web sockets is that even if you change browser, the data will still be updated on the first browser you opened

import {Server} from './config/server'
import {transactionRouter} from "./route/transaction.route";
import {payableRouter} from './route/Payable.route'

 
const server = new Server()
server.bootstrap([transactionRouter, payableRouter],false).then(server=>{

  console.log('Server is listening on:', server.appPort)
  
}).catch(error=>{
  console.log('Server failed to start')
  console.error(error)
  process.exit(1)
})
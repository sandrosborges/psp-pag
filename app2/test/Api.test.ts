import 'jest'
//import * as request from 'supertest'

import {Server} from '../config/server'
import {environment} from '../common/environment'
import {transactionRouter} from '../route/transaction.route'
import {payableRouter} from '../route/Payable.route'


const request = require('supertest');

let server:Server
let address:string

beforeAll( ()=>{

    
    // environment.server.port = process.env.SERVER_PORT || 3001
    // address = `http://localhost:${environment.server.port}`

    server = new Server()
    return  server.bootstrap([transactionRouter, payableRouter],true).then(server=>{

        console.log('Server is listening on:', server.appPort)
        
      }).catch(error=>{
        console.log('Server failed to start')
        console.error(error)
        process.exit(1)
      })
})

describe(` *** TRANSACTION TESTS ***`,() =>{


    test('POST /transaction - successful ', ()=>{
        return request(server.app)
        .post('/transaction')
        .send({
            "vl_tran":"20.50",
            "ds_tran":"transacao jest 0001 - POST",
            "pay_method":"C",
            "card_number":"0000000000001234",
            "card_bearer":"Sandro S Borges",
            "card_valid_thru":"2021-10-01",
            "card_cvv":"001",
            "cod_pdv":"PDV000001"        
        })
        .then(response =>{
            expect(response.status).toBe(200) 
        })
        .catch(fail)
    })

    test('POST /transaction - fail: invalid data input', ()=>{
        return request(server.app)
        .post('/transaction')
        .send({
            "vl_tran":"20.50",
            "ds_tran":"transacao jest 0002 - POST",
            "pay_method":"C"    
        })
        .then(response =>{
            expect(response.status).toBe(422) 
        })
        .catch(fail)
    })



    test('get /transaction - successful', ()=>{
        return request(server.app)
        .get('/transaction')
        .then(response =>{
            expect(response.status).toBe(200) 
        })
        .catch(fail)
    })

    test('get /transaction/aaa - invalid id', ()=>{
        return request(server.app)
        .get('/transaction/aaa')
        .then(response =>{
            expect(response.status).toBe(400) 
        })
        .catch(fail)
    })

    test('get "/transaction/1" - successful ', ()=>{
        return request(server.app)
        .get('/transaction/1')
        .then(response =>{
            expect(response.status).toBe(200) 
        })
        .catch(fail)
    })

})


describe(` *** PAYABLE TESTS ***`,() =>{

    test('get /payable - successful', ()=>{
        return request(server.app)
        .get('/payable')
        .then(response =>{
            expect(response.status).toBe(200) 
        })
        .catch(fail)
    })

    test('get /payable/1 - successful', ()=>{
        return request(server.app)
        .get('/payable/1')
        .then(response =>{
            expect(response.status).toBe(200) 
        })
        .catch(fail)
    })

    test('get /payable/aa - invalid id', ()=>{
        return request(server.app)
        .get('/payable/aa')
        .then(response =>{
            expect(response.status).toBe(400) 
        })
        .catch(fail)
    })
    

    test('get /payable/extrato/PDV000001 - successful', ()=>{
        return request(server.app)
        .get('/payable/extrato/PDV000001')
        .then(response =>{
            expect(response.status).toBe(200) 
        })
        .catch(fail)
    })


})




afterAll(()=>{
    
})
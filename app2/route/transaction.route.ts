import { Router } from '../common/router'
import { Express } from 'express'
import {TransactionController} from '../controller/transaction.controller'
import {handler} from '../common/response.handler'
import {validationMiddleware} from '../common/validation.middleware'
import {schemas} from '../joi.schema/transaction.schema'
import * as pg from 'pg'

class TransactionRouter extends Router {

 
  applyRoutes(application: Express, db:pg.Pool) {

    const controller = new TransactionController(db)
    
    //=========================================================================
    // Retorna todas as trnsacoes
    application.get('/transaction', (req, res) => {
      let baseurl:string = req.originalUrl
        return  handler.response(res,controller.getTransactions(),baseurl)                  
    }) 

    //=========================================================================
    // Retorna uma transacao especifica, pelo ID
    application.get('/transaction/:id' ,(req, res) => {
 
      if(/^(\-|\+)?([0-9]+|Infinity)$/.test(req.params.id)) 
      {
        let baseurl:string = req.originalUrl.replace(req.params.id,'')
        return  handler.response(res,controller.getTransaction(Number(req.params.id)),baseurl) 
      }
      else
        return  res.status(400).json({"error":"Id nao e valido."})

    }) 

    //=========================================================================
    // Retorna todas as trnsacoes === 
    application.post('/transaction', validationMiddleware(schemas.transaction, 'body'), (req, res) => {
 
      let baseurl:string = req.originalUrl
        return  handler.response(res,controller.createTransaction(req,res),baseurl)     

    }) 
  }

  
}

export const transactionRouter = new TransactionRouter()
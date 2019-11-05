import { Router } from '../common/router'
import { Express } from 'express'
import {PayableController} from '../controller/payable.controller'
import {handler} from '../common/response.handler'
import {validationMiddleware} from '../common/validation.middleware'
import {schemas} from '../joi.schema/transaction.schema'
import * as pg from 'pg'

class PayableRouter extends Router {

   

    applyRoutes(application: Express, db: pg.Pool) {        
        
        const controller = new PayableController(db)

      

        //=========================================================================
        // Retorna todas os pagamentos
        application.get('/payable', (req, res) => {
            let baseurl:string = req.originalUrl
            return  handler.response(res,controller.getPayables(),baseurl)                  
        }) 

        // Retorna um payable
        application.get('/payable/:id', (req, res) => {

            if(/^(\-|\+)?([0-9]+|Infinity)$/.test(req.params.id)) 
            {
              let baseurl:string = req.originalUrl.replace(`/${req.params.id}`,'')
              return  handler.response(res,controller.getPayable(Number(req.params.id)),baseurl) 
            }
            else
              return  res.status(400).json({"error":"Id nao e valido."})

        })         
     
       

        // Retorna o saldo dos payables agrupados por cliente (cod_PDV)
        application.get('/payable/extrato/:cod_pdv', (req, res) => {
            let baseurl:string= req.originalUrl.replace(`/${req.params.cod_pdv}`,'')
            return  handler.response(res,controller.getExtrato(req.params.cod_pdv),baseurl)                  
        }) 


    }

}

export const payableRouter = new PayableRouter()

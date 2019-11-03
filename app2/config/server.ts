import   express, { request } from 'express'
import   cors from  'cors'
import { json, urlencoded } from 'body-parser'
import { Express } from 'express'
import {Router}  from "../common/router"
import errorMiddleware from './errorMiddleware';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";
import {environment} from '../common/environment'
import * as pg from 'pg'

const Pool = pg.Pool


export class Server {

    private env:string
    public appPort:number
    public dbConnection:pg.Pool


    app: Express
  
    constructor() {       
    }

    initializeDb(testEnv:boolean):Promise<any> {
      return new Promise((resolve, reject)=>{
        try{   
              let dbConfig = testEnv?environment.db.configTest:environment.db.config
              this.dbConnection = new Pool(dbConfig);
              resolve()
            }
            catch(error){
              reject(error)
            }
      })
    }
  
    initRoutes(routers:Router[]): Promise<any>{
      return new Promise((resolve, reject)=>{
        try{     
            
              this.app = express()
              
              // Express middleware
              this.app.use(cors({
                  optionsSuccessStatus: 200
              }))

              this.app.use(urlencoded({
                extended: true
                }))
                this.app.use(json())
                this.app.listen(this.appPort, () => {
                  resolve(this.app)
                })  
          
              //routes
              for (let route of routers){
                  route.applyRoutes(this.app, this.dbConnection)
              }     


              swaggerDocument.host = `localhost:${this.appPort}`
              this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
 
              this.app.use(errorMiddleware)               
  
 
  
        }catch(error){
          reject(error)
        }
      })
    }
  
  
    getApp() {
      return this.app
    }   
  
    bootstrap(routers:Router[] = [], testEnv:boolean): Promise<Server>{
      this.appPort =testEnv?parseInt(environment.server.portTest.toString())
          :parseInt(environment.server.port.toString())

      return this.initializeDb(testEnv).then(()=>
        this.initRoutes(routers).then(()=> this))
    }

    
  }
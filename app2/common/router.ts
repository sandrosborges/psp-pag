import { Express } from 'express'
import * as pg from 'pg'

export abstract class Router{
  _basePath: string

  /**
   *  Metodo abstrato de aplicacao de rotas
   * @param application  
   * @param db 
   */
  abstract applyRoutes(application: Express, db:pg.Pool)



}
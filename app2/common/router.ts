import { Express } from 'express'
import * as pg from 'pg'

export abstract class Router{
  _basePath: string

  abstract applyRoutes(application: Express, db:pg.Pool)



}
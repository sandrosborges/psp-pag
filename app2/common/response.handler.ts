import * as express from 'express'

class ResponseHandler{

    _basePath: string;

    
    //response(res:express.Response, error:any, result:any, errStatus:number=null):void
    response(res:express.Response, result:Promise<any>, basePath:string)
    {
        
        result.then(result =>{
            var resultLen = result.rows.length

            switch (resultLen) {
                case 0:
                    res.status(404).json([]);
                    break;
                case 1:
                    res.status(200).json(this.envelope(result.rows[0],basePath));
                    break;
                default:
                    res.status(200).json(this.envelopeAll(result.rows,basePath));
            }
    

        }).catch(ex =>{            
            res.status(500).json(ex.stack)
        })
        
    
    }

    envelope(document:any, basePath:string):any{
        let resource = Object.assign({_links:{}}, document)

        if (resource.id== undefined)
            resource._links.self = basePath
        else
            resource._links.self =`${basePath}${resource.id}`
       
        return resource
    }

    envelopeAll(documents:[any], basePath:string):any{
        const resource:any = {
            _links:{
              self:`${basePath}`
            },
            items: documents
          }     
        
          resource.items.forEach((document, index, array) =>{          
            array[index] = this.envelope(document,basePath)
          })       
        
       
        return resource
    }

}

export const handler = new ResponseHandler()

import * as express from 'express'

class ResponseHandler{

    _basePath: string;

    /**
     * Metodo para tratar o http response dos serviços
     *
     * @param res : Http response
     * @param result : Dados (json) que serão retornados
     * @param basePath : Path de origem dos dados
     */
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
           res.status(500).json(ex.message)
        })
        
    
    }

    /**
     *  Metodo que faz o envelopamento dos dados e acrescenta os links hypermedia (HATEOAS)
     *  para um documento
     *
     * @param document : Documento (json) que sera envelopado e retornado
     * @param basePath : caminho base dos metodos que originaram os dados para criação dos links
     */
    envelope(document:any, basePath:string):any{
        let resource = Object.assign({_links:{}}, document)

        if (resource.id== undefined)
            resource._links.self = basePath
        else
            resource._links.self =`${basePath}/${resource.id}`
       
        return resource
    }

    /**
     *  Metodo que faz o envelopamento dos dados e acrescenta os links hypermedia (HATEOAS)
     *  para varios documentos.
     *
     * @param documents  
     * @param basePath 
     */
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

var dateFormat = require('dateformat');

class Helper {

   /**
    * Metodo que formata uma data para um formato especifico. Ex.: dd-mm-yyyy
    *
    * @param date : Data
    * @param format : formato especificado. ex.: dd-mm-yy,  yyyy-mm-dd
    */
   dateFormat(date:any, format:string)
   {
      return dateFormat(date, format);
   }

   /**
    * Metodo para add. dias a uma data
    * 
    * @param date : Data  
    * @param days : Numero de dias a ser adicionado
    */
   dateAddDays(date:any, days:number):Date
   {
      return date.getTime() + days * 86400000;
   } 

}

export const helper = new Helper()

var dateFormat = require('dateformat');

class Helper {

   dateFormat(date:any, format:string)
   {
      return dateFormat(date, format);
   }

   dateAddDays(date:any, days:number):Date
   {
      return date.getTime() + days * 86400000;
   } 

}

export const helper = new Helper()

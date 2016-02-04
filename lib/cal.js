"use strict";
module.exports = function(yearParam, monthParam) {

  let yearArg = yearParam;
  let monthArg = monthParam;

  let args = [yearArg, monthArg];

  if (monthArg === undefined) {
    args = [yearArg];
  }

  if (yearArg === undefined) {
    let today = new Date();
    args = [today.getFullYear(), today.getMonth() + 1];
  }

  const validate = require('node-cal/lib/validateArgs').validate;
  const getMonth = require('node-cal/lib/month').getMonth;
  const getYear = require('node-cal/lib/year').getYear;
  const validatedArgs = validate(args);


  if (validatedArgs){
     yearArg = validatedArgs[0];
      monthArg = validatedArgs[1];



    if (yearArg && monthArg) {
      let output = getMonth(yearArg, monthArg);
      return(output);
    }

    else if (yearArg && !monthArg) {
      let output = getYear(yearArg);
      return(output);
    }
  }

  else {
    return("Invalid parameters: <br> Try again useing cal/YYYY/MM");
  }
}
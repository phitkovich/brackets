module.exports = function check(str, bracketsConfig) {
  // your solution
  var arrBracketsOpen = [];
  var numberChar = 0;
  var closedBrackets = "";
  var allBrackets;
  var status = true;
  var symbol;
  var identicalBrackets;
  
  for (var i = 0; i < bracketsConfig.length; i++) {    
    closedBrackets = closedBrackets + bracketsConfig[i][1];
  }

  allBrackets = searchAllBrackets(bracketsConfig);
  identicalBrackets = searchIdenticalBrackets(bracketsConfig);

  if (searchBrackets(str, closedBrackets)) {
    return true;
  } else {
    return false;
  }

  function searchBrackets(str, closedBrackets) {
    while ((status)&&(numberChar < str.length)) {
      symbol = str.charAt(numberChar);
      if (!(~allBrackets.indexOf(symbol))) {
        numberChar++;
        continue;
      }

      if (~identicalBrackets.indexOf(symbol) ) {        
        if ( (symbol == arrBracketsOpen[arrBracketsOpen.length-1]) && (~closedBrackets.indexOf(symbol)) ) {
          if ( searchOpenBrackets(symbol, bracketsConfig) == arrBracketsOpen.pop() ) {
            numberChar++;
            return true;
          } else {
            status = false;
            return false;          
          }
        } else {
          arrBracketsOpen.push(symbol);
          numberChar++;
          status = searchBrackets(str, closedBrackets);          
        }
      } else {
        if ( ~closedBrackets.indexOf(symbol) ) {
          if ( searchOpenBrackets(symbol, bracketsConfig) == arrBracketsOpen.pop() ) {
            numberChar++;
            return true;
          } else {
            status = false;
            return false;          
          }
        } else {
        arrBracketsOpen.push(symbol);
        numberChar++;
        status = searchBrackets(str, closedBrackets);        
        }
      }
         
    }
    if (arrBracketsOpen.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  function searchOpenBrackets(symbol, bracketsConfig) {
    for (var i = 0; i < bracketsConfig.length; i++) {
      if (symbol == bracketsConfig[i][1]) {
        return bracketsConfig[i][0];
      }      
    }
  }
  
  function searchAllBrackets(bracketsConfig) {
    var resultString = "";
    for (var i = 0; i < bracketsConfig.length; i++) {
      for (var j = 0; j < bracketsConfig[i].length; j++) {
        resultString = resultString + bracketsConfig[i][j];
      }
    }
    
    return resultString;
  }

  function searchIdenticalBrackets(bracketsConfig) {
    var identicalBrackets = "";
    for (var i = 0; i < bracketsConfig.length; i++) {
      if (bracketsConfig[i][0] == bracketsConfig[i][1]) {
        identicalBrackets = identicalBrackets + bracketsConfig[i][0];
      }      
    }

    return identicalBrackets;
  }

}

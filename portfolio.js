
exports.createPortfolio= () => {
  return {};
}

exports.addStock = (ticker, amount, portfolio) => {
  if (amount == 0)
    return;
  portfolio[ticker] = amount;
}

exports.removeStock = (ticker, portfolio) => {
  delete portfolio[ticker];
}

exports.isEmpty = (portfolio) => {
  return Object.keys(portfolio).length == 0;
}

exports.uniqueStocks = (portfolio) => {
  return Object.keys(portfolio).length;
}

exports.countShares = (ticker, portfolio) => {
  if (portfolio.hasOwnProperty(ticker)){
    return portfolio[ticker];
  } else{
    return 0;
  }
}

exports.purchaseShares = (ticker, numShares, portfolio) => {
  if (portfolio.hasOwnProperty(ticker)){
    portfolio[ticker] = portfolio[ticker] + numShares;
  } else {
    if (portfolio[ticker] == 0)
      return;
    portfolio[ticker] = numShares;
  }
}

exports.sellShares = (ticker, numShares, portfolio) => {
  var new_value = portfolio[ticker] - numShares; 
  if (new_value <= 0){
    delete portfolio[ticker];
  } else {
    portfolio[ticker] = portfolio[ticker] - numShares;
  }
}
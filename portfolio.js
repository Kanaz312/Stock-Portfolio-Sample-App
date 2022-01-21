
exports.createPortfolio= () => {
  return {};
}

exports.addStock = (ticker, amount, portfolio) => {
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
    portfolio[ticker] = numShares;
  }
}
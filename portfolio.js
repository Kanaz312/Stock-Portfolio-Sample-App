
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
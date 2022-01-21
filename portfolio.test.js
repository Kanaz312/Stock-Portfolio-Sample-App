const exp = require('constants');
const myFunctions = require('./portfolio.js');

describe('Testing Stock Portfolio', () => {
  var testPortfolio;
  beforeEach(() => {
    testPortfolio = myFunctions.createPortfolio();
  });

  afterEach(() => {
    testPortfolio = null;
  });

  test('Testing create portfolio', () => {
    expect(testPortfolio).toMatchObject({});
  });

  test('Testing add to portfolio', () => {
    const target = {"GME" : 100}
    myFunctions.addStock("GME", 100, testPortfolio);
    expect(testPortfolio).toMatchObject(target);
  });

  test('Testing remove from portfolio', () => {
    const target = {}
    myFunctions.addStock("RBLX", 190, testPortfolio);
    myFunctions.removeStock("RBLX", testPortfolio);
    expect(testPortfolio).toMatchObject(target);
  });

  test('Testing is portfolio empty - true', () => {
    expect(myFunctions.isEmpty(testPortfolio)).toBe(true);
  });

  test('Testing is portfolio empty - false', () => {
    myFunctions.addStock("GME", 109, testPortfolio);
    expect(myFunctions.isEmpty(testPortfolio)).toBe(false);
  });

  test('Testing unique stocks - empty', () =>{
    expect(myFunctions.uniqueStocks(testPortfolio)).toBe(0);
  });

  test('Testing unique stocks - 1', () =>{
    myFunctions.addStock("GME", 400, testPortfolio);
    expect(myFunctions.uniqueStocks(testPortfolio)).toBe(1);
  });

  test('Testing unique stocks - 2', () =>{
    myFunctions.addStock("GME", 400, testPortfolio);
    myFunctions.addStock("RBLX", 2890, testPortfolio);
    expect(myFunctions.uniqueStocks(testPortfolio)).toBe(2);
  });

  test('Testing Purchase Shares - Not In Object', () => {
    myFunctions.purchaseShares("GME", 400, testPortfolio);
    expect(testPortfolio).toMatchObject({"GME" : 400});
  });

  test('Testing Purchase Shares - In Object', () => {
    myFunctions.addStock("RBLX", 11, testPortfolio);
    myFunctions.purchaseShares("RBLX", 19, testPortfolio);
    expect(testPortfolio).toMatchObject({"RBLX" : 30});
  });

  test('Testing Selling Shares - First Added', () => {
    myFunctions.addStock("RBLX", 11, testPortfolio);
    myFunctions.sellShares("RBLX", 10, testPortfolio);
    expect(testPortfolio).toMatchObject({"RBLX" : 1});
  });

  test('Testing Selling Shares - Second Added', () => {
    myFunctions.addStock("RBLX", 327, testPortfolio);
    myFunctions.addStock("GME", 110, testPortfolio);
    myFunctions.sellShares("GME", 9, testPortfolio);
    myFunctions.sellShares("GME", 1, testPortfolio);
    myFunctions.sellShares("RBLX", 30, testPortfolio)
    expect(testPortfolio).toMatchObject({"RBLX" : 297, "GME" : 100});
  });

  test('Testing count shares - First Added', () => {
    myFunctions.addStock("GME", 13, testPortfolio);
    expect(myFunctions.countShares("GME", testPortfolio)).toBe(13);
  });

  test('Testing count shares - Second Added', () => {
    myFunctions.addStock("GME", 400, testPortfolio);
    myFunctions.addStock("RBLX", 989, testPortfolio);
    expect(myFunctions.countShares("RBLX", testPortfolio)).toBe(989);
  });

  test('Testing count shares - Not in Portfolio', () => {
    myFunctions.addStock("GME", 400, testPortfolio);
    myFunctions.addStock("RBLX", 989, testPortfolio);
    expect(myFunctions.countShares("AAPL", testPortfolio)).toBe(0);
  });

  test('Testing Prevention of Zero Shares - Second Sold', () => {
    myFunctions.addStock("RBLX", 327, testPortfolio);
    myFunctions.addStock("GME", 110, testPortfolio);
    myFunctions.sellShares("GME", 9, testPortfolio);
    myFunctions.sellShares("GME", 1, testPortfolio);
    myFunctions.sellShares("RBLX", 327, testPortfolio);
    expect(testPortfolio).toMatchObject({"GME" : 100});
  });

  test('Testing Prevention of Zero Shares - Multiple Selling', () => {
    myFunctions.addStock("RBLX", 327, testPortfolio);
    myFunctions.addStock("GME", 10, testPortfolio);
    myFunctions.sellShares("GME", 9, testPortfolio);
    myFunctions.sellShares("GME", 1, testPortfolio);
    myFunctions.sellShares("RBLX", 30, testPortfolio);
    expect(testPortfolio).toMatchObject({"RBLX" : 297});
  });

  test('Testing Prevention of Zero Shares - Purchasing 0 of New Stock', () => {
    myFunctions.purchaseShares("RBLX", 0, testPortfolio);
    expect(testPortfolio).toMatchObject({});
  });

});

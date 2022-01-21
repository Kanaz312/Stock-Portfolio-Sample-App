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
});

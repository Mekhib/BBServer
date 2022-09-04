var plaidClient = require("../javascripts/Plaid");
var moment = require("moment")
const now = moment();
const today = now.format("YYYY-MM-DD");
const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");
const lastDay = moment().subtract(1, "w").format("YYYY-MM-DD");

var getBalance = async (req, res) => {
  const access_token = req.query.access_token;
  // console.log("accessToken", access_token)
 
  try {
    const retriveBalance = await plaidClient.accountsBalanceGet({
      access_token,
    });
    const accounts = retriveBalance.data.accounts;
    if (accounts) {
      res.json(accounts);
    }
  } catch (error) {
    console.log("errr", error);
    res.json(403);
  }
  // console.log("balances!!", accounts);
};

var getTransactions = async (req, res) => {
  console.log(today, thirtyDaysAgo, lastDay)
  const access_token = req.query.access_token;
  try {
 const response = await plaidClient.transactionsGet(
   {
      access_token: access_token,
      end_date: today,
      start_date: lastDay,
      
    });   
 const accounts = response.data; 
   res.json(accounts);

  }
  catch(error) {
    console.log('errr',error) 
      res.json(403)
      
  }




   
  
};

var getAllTransactions = async (req, res) => {
  const access_token = req.query.access_token;
  console.log("accessT", access_token);
  const response = await plaidClient.transactionsGet({
    access_token,
    start_date: thirtyDaysAgo,
    end_date: today,
  });
  const accounts = response.data;
  console.log("trans!!", accounts);
  if (accounts) {
    res.json(accounts);
  }
};

module.exports = {getBalance, getTransactions, getAllTransactions}
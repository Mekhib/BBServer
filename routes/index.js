
var {v4} = require("uuid");
var plaidClient = require("../javascripts/Plaid");


var express = require("express");
var router = express.Router();

const request = {
  user: {
    client_user_id: v4(),
  },
  client_name: "Beautiful Banking",
  products: ["auth", "transactions"],
  country_codes: ["US"],
  language: "en",
 
};
/* GET home page. */
var linkCreate =  async  (req, res) => {
    const createTokenResponse = await plaidClient.linkTokenCreate(request);
    console.log("create!!",createTokenResponse)
    res.json(createTokenResponse.data);
  
};

var tokenExchange = async (req, res) => {
const public_token = req.query.publicToken
const response = await plaidClient.itemPublicTokenExchange({ public_token });
if(response.data.access_token) res.send({status: 200, token: response.data.access_token});
};

module.exports = {router, linkCreate, tokenExchange};

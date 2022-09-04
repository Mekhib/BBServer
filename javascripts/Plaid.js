const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const plaid_client_id = "5e98c6961489d00012eddd8e";
const plaid_secret = "3cf4222dffacf10ecd0e1a58e8fefb";

const configuration = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": plaid_client_id,
      "PLAID-SECRET": plaid_secret,
    },
  },
});
const plaidClient = new PlaidApi(configuration);

module.exports = plaidClient

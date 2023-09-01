require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();
require("solhint");
require("./tasks/block-number")

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const WALLET_PK = process.env.PRIVATE_KEY
const ETHERSCAN_APIKEY = process.env.ETHERSCAN_APIKEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [WALLET_PK],
      chainId: 11155111
    }
  },
  solidity: "0.8.19",
  etherscan: {
    apiKey: ETHERSCAN_APIKEY,
  }
};

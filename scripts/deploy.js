const {ethers, run, network} = require("hardhat");



async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("deploying contract...")

  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`deployed contract to ${simpleStorage.address}`)

  // verify contract

  // console.log(network.config)
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_APIKEY) {
    console.log("waiting for 6 block confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    await verifyContract(simpleStorage.address, [])
  }

  // retrieve item
  const currentVal = await simpleStorage.retrieve()
  console.log(`Current value is ${currentVal}`)

  // store item
  const storeNumber = await simpleStorage.store(26)
  await storeNumber.wait(1)

  // update val
  const updateVal = await simpleStorage.retrieve()
  console.log(`New Value is ${updateVal}`)
}

async function verifyContract(contractAddress, args) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      contructorArguments: args,
    })
  } catch (error) {
    if(error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(error)
    }
    
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

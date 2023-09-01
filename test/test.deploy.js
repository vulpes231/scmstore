const { assert } = require("chai")

describe("SimpleStorage", function() {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function() {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("It should start with a fav no of 0", async function() {
        const currentVal = await simpleStorage.retrieve()
        const expectedVal = 0
        assert.equal(currentVal.toString(), expectedVal)
    })

    it("Should update when we call store", async function() {
        const expectedVal = 7
        const txRes = await simpleStorage.store(expectedVal)
        await txRes.wait(1)
        const curVal = await simpleStorage.retrieve()
        console.log(curVal.toString())
        assert.equal(curVal.toString(), expectedVal)
    })
})
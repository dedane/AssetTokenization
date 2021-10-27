const Token = artifacts.require("MyToken");

let chair = require('chai')
const BN = web3.utils.BN
const chaiBN = require("chai-bn")(BN)
chai.use(chaiBN)

let chaiAsPromised = require("chai-as-promised");
const { isTypedArray } = require('util/types');
const { contracts_build_directory } = require('../truffle-config');
chai.use(chaiAsPromised)

const expect = chai.expect;

contracts_build_directory("Token Test",async (accounts) => {
    it("All Tokens should be in my account", async() => {
        let instance = await Token.deployed()
        let TotalSupply = await istance.totalSupply()
        expect( await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);        

    })
})
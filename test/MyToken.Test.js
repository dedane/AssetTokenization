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

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("All Tokens should be in my account", async() => {
        let instance = await Token.deployed()
        let TotalSupply = await istance.totalSupply()
        //let balance = await instance of balanceOf(account[0])
        //assert.equal(balance.valueOf(), initialSupplly.valueOf(), "The balance was not the same")
        expect( await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);        
    })

    it("is possible to send tokens between accounts", async()=> {
        const sendTokens = 1;
        let instance = await Token.deployed();
        let totalsupply = await instance.totalsupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bigNumber.equal(totalsupply);
        expect(instance.balanceOf(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bigNumber.equal(totalsupply).sub(new BN(sendTokens));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bigNumber.equal(new BN(sendTokens))
    })

    it("is not possible to send more tokens than available in total", async()=> {
        let instance = await Token.deployed()
        let balanceOfDeployer = await instance.balanceOf(deployerAccount)
        expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.fulfilled
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bigNumber.equal(balanceOfDeployer)
    })
})
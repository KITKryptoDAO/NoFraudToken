const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  describe("HuoToken", function () {

    async function setup() {
        const [signer, spender] = await ethers.getSigners();
        const huo = await ethers.getContractFactory("HuoToken");
        const huoProxy = await upgrades.deployProxy(huo)
        await huoProxy.waitForDeployment();
        const signerAddress = await signer.getAddress();
        const spenderAddress = await spender.getAddress();
        return { huoProxy, signerAddress, spenderAddress};
    };

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { huoProxy, signerAddress } = await loadFixture(setup);
            expect(await huoProxy.owner()).to.equal(signerAddress);
        });
    });
    describe("Minting", function () {
        it("Should mint a token", async function () {
            const { huoProxy, signerAddress } = await loadFixture(setup);
            const to = "0xcD7e175dcE25e27a89e9954C1218FAb2A5955a1d"
            await huoProxy.mint(to, 1);
            expect(await huoProxy.balanceOf(to)).to.equal(1);
        });
    });
    describe("Approving", function () {
        it("Should approve a token", async function () {
            const { huoProxy, signerAddress } = await loadFixture(setup);
            await huoProxy.mint(signerAddress, 1);
            const spender = "0xcD7e175dcE25e27a89e9954C1218FAb2A5955a1d"
            await huoProxy.approve(spender, 1);
            expect(await huoProxy.getApproved(1)).to.equal(spender);
        });
    });

    describe("Approving all", function () {
        it("Should approve all tokens", async function () {
            const { huoProxy, signerAddress } = await loadFixture(setup);
            const spender = "0xcD7e175dcE25e27a89e9954C1218FAb2A5955a1d"
            await huoProxy.setApprovalForAll(spender, true);
            expect(await huoProxy.isApprovedForAll(signerAddress, spender)).to.equal(true);
        });
    });

    describe("Burning", function () {
        it("Should burn a token", async function () {
            const { huoProxy, signerAddress } = await loadFixture(setup);
            await huoProxy.mint(signerAddress, 1);
            await huoProxy.burn(1);
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(0);
        });
    });

    describe("Spending", function (){
        it("Should spend a token", async function () {
            const { huoProxy, signerAddress, spenderAddress } = await loadFixture(setup);
            await huoProxy.mint(signerAddress, 1);
            await huoProxy.mint(signerAddress, 2);
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(2);
            expect(await huoProxy.balanceOf(spenderAddress)).to.equal(0);
            await huoProxy.approve(spenderAddress, 1);
            await huoProxy.transferFrom(signerAddress, spenderAddress, 2);
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(1);
            expect(await huoProxy.balanceOf(spenderAddress)).to.equal(1);
        });
    });

    
  })
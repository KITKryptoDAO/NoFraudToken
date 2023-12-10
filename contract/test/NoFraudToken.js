const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  describe("NoFraudeToken", function () {

    async function setup() {
        const [signer, spender] = await ethers.getSigners();
        const huo = await ethers.getContractFactory("HuoToken");
        const huoProxy = await upgrades.deployProxy(huo)
        await huoProxy.waitForDeployment();
        const nft = await ethers.getContractFactory("NoFraudToken");
        const nftProxy = await upgrades.deployProxy(nft)
        await nftProxy.waitForDeployment();

        const signerAddress = await signer.getAddress();
        const spenderAddress = await spender.getAddress();

        return { huoProxy, nftProxy, signerAddress,spenderAddress };
    };

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { huoProxy, nftProxy, signerAddress } = await loadFixture(setup);
            expect(await huoProxy.owner()).to.equal(signerAddress);
            expect(await nftProxy.owner()).to.equal(signerAddress);
        });
    });

    describe("Burn", function () {
        it("Should burn a token", async function () {
            const { huoProxy, nftProxy, signerAddress } = await loadFixture(setup);
            for (let i = 0; i < 10; i++) {
                await huoProxy.mint(signerAddress, i);
            }
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(10);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(0);
            await huoProxy.setApprovalForAll(nftProxy, true);

            for (let i = 0; i < 10; i++) {
                await nftProxy.sendToBurn(huoProxy, i);
            }
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(0);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(10);
            
        });
    });

    describe("Back", function () {
        it("Should back a token", async function () {
            const { huoProxy, nftProxy, signerAddress } = await loadFixture(setup);
            for (let i = 0; i < 10; i++) {
                await huoProxy.mint(signerAddress, i);
            }
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(10);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(0);
            await huoProxy.setApprovalForAll(nftProxy, true);

            for (let i = 0; i < 10; i++) {
                await nftProxy.sendToBurn(huoProxy, i);
            }
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(0);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(10);
            
            for (let i = 0; i < 10; i++) {
                await nftProxy.getBack(huoProxy, i);
            }
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(10);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(0);
        });
    });

    describe("BulkBurn", function () {
        it("Should bulk burn tokens", async function () {
            const { huoProxy, nftProxy, signerAddress } = await loadFixture(setup);
            for (let i = 0; i < 10; i++) {
                await huoProxy.mint(signerAddress, i);
            }
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(10);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(0);
            await huoProxy.setApprovalForAll(nftProxy, true);

            await nftProxy.bulkBurn(huoProxy, [0,1,2,3,4,5,6,7,8,9]);
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(0);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(10);
        });
    });

    describe("BulkBack", function () {
        it("Should bulk back tokens", async function () {
            const { huoProxy, nftProxy, signerAddress } = await loadFixture(setup);
            for (let i = 0; i < 10; i++) {
                await huoProxy.mint(signerAddress, i);
            }
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(10);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(0);
            await huoProxy.setApprovalForAll(nftProxy, true);

            await nftProxy.bulkBurn(huoProxy, [0,1,2,3,4,5,6,7,8,9]);
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(0);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(10);

            await nftProxy.bulkBack(huoProxy, [0,1,2,3,7,8,9]);
            expect(await huoProxy.balanceOf(signerAddress)).to.equal(7);
            expect(await huoProxy.balanceOf(nftProxy)).to.equal(3);
        });
    });

  })
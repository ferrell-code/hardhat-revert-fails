const { expect } = require('chai');
const { Contract } = require('ethers');
const { INCENTIVES, ACA } = require('@acala-network/contracts/utils/MandalaAddress');

const IncentivesABI = require('@acala-network/contracts/build/contracts/Incentives.json').abi;
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

describe('Incentives Contract', function () {
    let instance;
    let deployer;
    let user;
    let deployerAddress;

    beforeEach(async function () {
        [deployer, user] = await ethers.getSigners();
        userAddress  =await user.getAddress();
        deployerAddress = await deployer.getAddress();
        instance = new Contract(INCENTIVES, IncentivesABI, deployer);
    });

    describe("Incentive Tests", function () {
        this.timeout(100000);

        it("null address fails", async function () {
            expect(await instance.getDexRewardRate(NULL_ADDRESS)).to.be.reverted;
        });

        it("reverts when input bad PoolId Value", async function () {
            expect(await instance.getIncentiveRewardAmount(2, ACA, ACA)).to.be.reverted;
        });
    });
});

import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { VladasSand } from '../wrappers/VladasSand';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('VladasSand', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('VladasSand');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let vladasSand: SandboxContract<VladasSand>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        vladasSand = blockchain.openContract(VladasSand.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await vladasSand.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: vladasSand.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and vladasSand are ready to use
    });
});

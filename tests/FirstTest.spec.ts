import { Blockchain, SandboxContract, SendMessageResult, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { VladasSand } from '../wrappers/VladasSand';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';
import { findTransaction, flattenTransaction } from '@ton/test-utils';
import { NetworkProvider } from '@ton/blueprint';


describe('FirstTest', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('VladasSand');
    });


    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let vladasSand: SandboxContract<VladasSand>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        vladasSand = blockchain.openContract(VladasSand.createFromConfig({ counter: 20 }, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await vladasSand.sendDeploy(deployer.getSender());

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: vladasSand.address,
            deploy: true,
            success: true,
        });

        const txToInspect = findTransaction(deployResult.transactions, {
            to: vladasSand.address,
            deploy: true,
        });
        if (txToInspect == undefined) {
            throw new Error('Requested tx was not found.');
        }
        // User-friendly output
        // console.log(flattenTransaction(txToInspect));

        console.log("Deployed");
    });

    it('should correctly modify counter', async () => {
        let counter = await vladasSand.getCounter();
        expect(counter).toBe(20);

        const resultIncrease: SendMessageResult = await vladasSand.sendIncrease(deployer.getSender(), 5);
        expect(resultIncrease.transactions).toHaveTransaction({ success: true });

        counter = await vladasSand.getCounter();
        expect(counter).toBe(25);

        const resultDecrement = await vladasSand.sendDecrementCounterByOne(deployer.getSender());
        expect(resultDecrement.transactions).toHaveTransaction({ success: true });

        counter = await vladasSand.getCounter();
        expect(counter).toBe(24);

        const resultReset = await vladasSand.sendReset(deployer.getSender());
        expect(resultReset.transactions).toHaveTransaction({ success: true });

        counter = await vladasSand.getCounter();
        expect(counter).toBe(0);
    });
});



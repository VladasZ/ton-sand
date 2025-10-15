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
        console.log(flattenTransaction(txToInspect));
        // Verbose output
        console.log(txToInspect);


        console.log(await vladasSand.getCounter());

        let result: SendMessageResult = await vladasSand.sendIncrease(deployer.getSender(), 5);
        //
        // result.transactions.pop()?.mode?.toFixed()
        //
        // console.log(result);

        console.log(await vladasSand.getCounter());

        await vladasSand.sendDecrementCounterByOne(deployer.getSender());

        console.log(await vladasSand.getCounter());

        await vladasSand.sendReset(deployer.getSender());

        console.log(await vladasSand.getCounter());

    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and vladasSand are ready to use
    });
});



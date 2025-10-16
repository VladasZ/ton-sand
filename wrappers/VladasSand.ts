import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
    toNano,
} from '@ton/core';

export const CONTRACT_ADDRESS: string = "kQCgpj73jDojRsYS7OQs4xKPE3waE5hh0YdAU-yU4ERtfW3P";
export const DEPLOY_FEE: bigint = toNano('0.005');
export const FEE: bigint = toNano('0.005');


export class VladasSand implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new VladasSand(address);
    }

    static createFromConfig(config: { counter: number }, code: Cell, workchain = 0)  {
        const data = beginCell().storeUint(config.counter, 64).endCell();
        const init = { code, data };
        return new VladasSand(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: DEPLOY_FEE,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendIncrease(
        provider: ContractProvider,
        via: Sender,
        increaseBy: number,
    ) {
        await provider.internal(via, {
            value: FEE,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0x00000000, 32).storeUint(increaseBy, 32).endCell(),
        });
    }

    async sendReset(
        provider: ContractProvider,
        via: Sender,
    ) {
        await provider.internal(via, {
            value: FEE,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0x00000001, 32).endCell(),
        });
    }

    async sendDecrementCounterByOne(
        provider: ContractProvider,
        via: Sender,
    ) {
        await provider.internal(via, {
            value: FEE,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0x00000002, 32).endCell(),
        });
    }

    async getCounter(provider: ContractProvider) {
        const result = await provider.get('currentCounter', []);

        return result.stack.readNumber();
    }
}

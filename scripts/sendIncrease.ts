import { toNano } from '@ton/core';
import { CONTRACT_ADDRESS, VladasSand } from '../wrappers/VladasSand';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(new VladasSand(CONTRACT_ADDRESS));
    await firstContract.sendIncrease(provider.sender(), { value: toNano('0.05'), increaseBy: 1 });
    await provider.waitForLastTransaction();
}
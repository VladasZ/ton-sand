import { Address, toNano } from '@ton/core';
import { CONTRACT_ADDRESS, VladasSand } from '../wrappers/VladasSand';
import { NetworkProvider } from '@ton/blueprint';

const contractAddress = Address.parse(CONTRACT_ADDRESS);

export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(new VladasSand(contractAddress));
    await firstContract.sendReset(provider.sender());
    await provider.waitForLastTransaction();
}
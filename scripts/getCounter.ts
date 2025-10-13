import { Address } from '@ton/core';
import { VladasSand } from '../wrappers/VladasSand';
import { NetworkProvider } from '@ton/blueprint';

const contractAddress = Address.parse('kQArHqqCX2eR4bW_u1y9oG7cLA-nmJsKTeD_lfxDYcYfEjWh');

export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(new VladasSand(contractAddress));
    const counter = await firstContract.getCounter();
    console.log('Counter: ', counter);
}
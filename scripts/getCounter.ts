import { CONTRACT_ADDRESS, VladasSand } from '../wrappers/VladasSand';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(new VladasSand(CONTRACT_ADDRESS));
    const counter = await firstContract.getCounter();
    console.log('Counter: ', counter);
}
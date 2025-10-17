import {CONTRACT_ADDRESS, Sand} from '../wrappers/Sand';
import {NetworkProvider} from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(new Sand(CONTRACT_ADDRESS));
    const counter = await firstContract.getCounter();
    console.log('Counter: ', counter);
}
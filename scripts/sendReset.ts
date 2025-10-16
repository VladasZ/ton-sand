import { CONTRACT_ADDRESS, VladasSand } from '../wrappers/VladasSand';
import { NetworkProvider } from '@ton/blueprint';


export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(new VladasSand(CONTRACT_ADDRESS));
    await firstContract.sendReset(provider.sender());
    await provider.waitForLastTransaction();
}
import { VladasSand } from '../wrappers/VladasSand';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const vladasSand = provider.open(VladasSand.createFromConfig({ counter: 20 }, await compile('VladasSand')));

    console.log(provider)

    await vladasSand.sendDeploy(provider.sender());

    await provider.waitForDeploy(vladasSand.address);

    // run methods on `vladasSand`
}




import { toNano } from '@ton/core';
import { VladasSand } from '../wrappers/VladasSand';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const vladasSand = provider.open(VladasSand.createFromConfig({ counter: 20 }, await compile('VladasSand')));

    await vladasSand.sendDeploy(provider.sender());

    await provider.waitForDeploy(vladasSand.address);

    // run methods on `vladasSand`
}

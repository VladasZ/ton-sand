import { toNano } from '@ton/core';
import { VladasSand } from '../wrappers/VladasSand';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const vladasSand = provider.open(VladasSand.createFromConfig({ counter: Math.floor(Math.random() * 10000000) }, await compile('VladasSand')));

    await vladasSand.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(vladasSand.address);

    // run methods on `vladasSand`
}

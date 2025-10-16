import { VladasSand } from '../wrappers/VladasSand';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const vladasSand = provider.open(VladasSand.createFromConfig({ counter: 5001 }, await compile('VladasSand')));

    // console.log(provider)

    console.log(provider.sender());

    const result = await vladasSand.sendDeploy(provider.sender());

    console.log(result);

    await provider.waitForDeploy(vladasSand.address);

    console.log(vladasSand);

    console.log(await vladasSand.getCounter());

    // run methods on `vladasSand`
}




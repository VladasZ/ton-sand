import { toNano } from '@ton/core';
import { Sand } from '../wrappers/Sand';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sand = provider.open(
        Sand.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('Sand')
        )
    );

    await sand.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(sand.address);

    console.log('ID', await sand.getID());
}

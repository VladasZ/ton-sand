import {toNano} from '@ton/core';
import {CALL_VALUE, CONTRACT_ADDRESS, Sand} from '../wrappers/Sand';
import {NetworkProvider, sleep} from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = CONTRACT_ADDRESS;

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const sand = provider.open(Sand.createFromAddress(address));

    const counterBefore = await sand.getCounter();

    await sand.sendIncrease(provider.sender(), {
        increaseBy: 1,
        value: CALL_VALUE,
    });

    ui.write('Waiting for counter to increase...');

    let counterAfter = await sand.getCounter();
    let attempt = 1;
    while (counterAfter === counterBefore) {
        ui.setActionPrompt(`Attempt ${attempt}`);
        await sleep(2000);
        counterAfter = await sand.getCounter();
        attempt++;
    }

    ui.clearActionPrompt();
    ui.write('Counter increased successfully!');
}

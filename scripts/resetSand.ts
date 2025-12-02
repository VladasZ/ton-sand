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

    await sand.sendReset(provider.sender(), {
        value: CALL_VALUE,
    });

    ui.write('Waiting for counter to reset...');

    let counterAfter = await sand.getCounter();
    let attempt = 1;
    while (counterAfter !== 0) {
        ui.setActionPrompt(`Attempt ${attempt}`);
        await sleep(2000);
        counterAfter = await sand.getCounter();
        attempt++;
    }

    ui.clearActionPrompt();
    ui.write('Counter reset successfully!');
}

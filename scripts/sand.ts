import { VladasSand } from '../wrappers/VladasSand';
import { compile, NetworkProvider } from '@ton/blueprint';
import { mnemonicToPrivateKey, mnemonicNew } from "@ton/crypto";

export async function run(provider: NetworkProvider) {
    // const vladasSand = provider.open(VladasSand.createFromConfig({ counter: 20 }, await compile('VladasSand')));
    //
    // await vladasSand.sendDeploy(provider.sender());
    //
    // await provider.waitForDeploy(vladasSand.address);

    // run methods on `vladasSand`


    // Replace with your own persisted mnemonic phrase (see note below).
    const mnemonicArray = await mnemonicNew();

    console.log(mnemonicArray);

// derive private and public keys from the mnemonic
    const keyPair = await mnemonicToPrivateKey(mnemonicArray);

    console.log("Public Key: " + keyPair.publicKey.toString('hex'));
    console.log("Private Key: " + keyPair.secretKey.toString('hex'));
}

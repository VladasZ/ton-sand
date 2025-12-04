import { Blockchain } from "@ton/sandbox"
import {
    Account,
    Address,
    beginCell,
    Builder,
    Cell,
    contractAddress,
    Dictionary,
    loadOutAction,
    loadShardAccount,
    loadTransaction,
    Message,
    OutAction,
    parseTuple,
    ShardAccount,
    Slice,
    storeMessage,
    storeOutAction,
    storeShardAccount,
    Transaction,
    TupleItem,
    TupleReader,
} from '@ton/core';
import { randomAddress } from '@ton/test-utils';



export function createShardAccount(args: {
    address?: Address;
    code: Cell;
    data: Cell;
    balance: bigint;
    workchain?: number;
}): ShardAccount {
    let wc = args.workchain ?? 0;
    let address = args.address ?? contractAddress(wc, { code: args.code, data: args.data });
    let balance = args.balance ?? 0n;

    return {
        account: {
            addr: address,
            storage: {
                lastTransLt: 0n,
                balance: { coins: balance },
                state: {
                    type: 'active',
                    state: {
                        code: args.code,
                        data: args.data,
                    },
                },
            },
            storageStats: {
                used: {
                    cells: 0n,
                    bits: 0n,
                },
                lastPaid: 0,
                duePayment: null,
                storageExtra: null,
            },
        },
        lastTransactionLt: 0n,
        lastTransactionHash: 0n,
    };
}

describe('Sandbox', () => {
    it('should work', async () => {
        const blockchain = await Blockchain.create();

        const testAddress = randomAddress();

        await blockchain.setShardAccount(
            testAddress,
            createShardAccount({
                address: testAddress,
                code: Cell.fromBase64('te6ccgEBBAEAKQABFP8A9KQT9LzyyAsBAgFiAgMAEtBbAf4gMP4gMAAToHw6A/xAYfxAYQ=='),
                data: new Cell(),
                balance: toNano('1'),
            }),
        );

        // eslint-disable-next-line no-console
        console.log('transaction');

        await blockchain.sendMessage({
            info: {
                type: 'internal',
                dest: testAddress,
                src: randomAddress(),
                value: { coins: toNano('1') },
                bounce: true,
                ihrDisabled: true,
                bounced: false,
                ihrFee: 0n,
                forwardFee: 0n,
                createdAt: 0,
                createdLt: 0n,
            },
            body: beginCell().endCell(),
        });

        // eslint-disable-next-line no-console
        console.log('get method');

        await blockchain.runGetMethod(testAddress, 'test_dump', [
            { type: 'int', value: 3n },
            { type: 'int', value: 5n },
        ]);
    });
});


export function toNano(src: number | string | bigint): bigint {

    if (typeof src === 'bigint') {
        return src * 1000000000n;
    } else {
        if (typeof src === 'number') {
            if (!Number.isFinite(src)) {
                throw Error('Invalid number');
            }

            if (Math.log10(src) <= 6) {
                src = src.toLocaleString('en', { minimumFractionDigits: 9, useGrouping: false });
            } else if (src - Math.trunc(src) === 0) {
                src = src.toLocaleString('en', { maximumFractionDigits: 0, useGrouping: false });
            } else {
                throw Error('Not enough precision for a number value. Use string value instead');
            }
        }

        // Check sign
        let neg = false;
        while (src.startsWith('-')) {
            neg = !neg;
            src = src.slice(1);
        }

        // Split string
        if (src === '.') {
            throw Error('Invalid number');
        }
        let parts = src.split('.');
        if (parts.length > 2) {
            throw Error('Invalid number');
        }

        // Prepare parts
        let whole = parts[0];
        let frac = parts[1];
        if (!whole) {
            whole = '0';
        }
        if (!frac) {
            frac = '0';
        }
        if (frac.length > 9) {
            throw Error('Invalid number');
        }
        while (frac.length < 9) {
            frac += '0';
        }

        // Convert
        let r = BigInt(whole) * 1000000000n + BigInt(frac);
        if (neg) {
            r = -r;
        }
        return r;
    }
}

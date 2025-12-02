import { Cell, CellType } from '@ton/core';

/**
 * Serializable cell representation, used only for cell parsing testing between
 * different libraries
 */
export interface CellRepr {
    tp: String;
    data: String;
    refs: CellRepr[];
    level_mask: number;
    level: number;
    depth: number;
}

export function cellTypeToString(tp: CellType): string {
    switch (tp) {
        case CellType.Ordinary:
            return 'Ordinary';
        case CellType.PrunedBranch:
            return 'PrunedBranch';
        case CellType.Library:
            return 'Library';
        case CellType.MerkleProof:
            return 'MerkleProof';
        case CellType.MerkleUpdate:
            return 'MerkleUpdate';
        default:
            return 'Unknown';
    }
}

function cellReprFromTonCell(cell: Cell): CellRepr {
    return {
        tp: cellTypeToString(cell.type),
        data: cell.bits.toString(),
        refs: cell.refs.map((cell) => cellReprFromTonCell(cell)),
        level_mask: cell.mask.value,
        level: cell.level(),
        depth: cell.depth(),
    };
}

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Error: At least one hex string argument is required');
        process.exit(1);
    }

    try {
        const results: CellRepr[] = [];

        for (const hexString of args) {
            const cell = Cell.fromHex(hexString);
            const result = cellReprFromTonCell(cell);
            results.push(result);
        }

        console.log(JSON.stringify(results));
    } catch (error) {
        console.error('Error parsing cell:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

main();

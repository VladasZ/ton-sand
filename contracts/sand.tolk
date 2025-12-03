tolk 1.1

// this struct defines storage layout of the contract
struct Storage {
    id: uint32  // required to allow multiple independent counter instances, since the contract address depends on its initial state
    counter: uint32 // the current counter value
}

// load contract data from the persistent storage
fun Storage.load() {
    return Storage.fromCell(contract.getData())
}

// save contract data into the persistent storage
fun Storage.save(self) {
    contract.setData(self.toCell())
}

// the struct uses a 32-bit opcode prefix for message identification
struct (0x00000001) IncreaseCounter

// the struct uses a 32-bit opcode prefix for message identification
struct (0x00000002) DecreaseCounter

// using unions to represent available messages
// this allows processing them with pattern matching
type AllowedMessage = IncreaseCounter | DecreaseCounter

// the main entrypoint: called when a contract receives an message from other contracts
fun onInternalMessage(in: InMessage) {
    // use `lazy` to defer loading fields until they are accessed
    val msg = lazy AllowedMessage.fromSlice(in.body);

    match (msg) {
        IncreaseCounter => {
            // load contract storage lazily (efficient for large or partial reads/updates)
            var storage = lazy Storage.load();

            storage.counter += 15;
            storage.save();
        }

        DecreaseCounter => {
            // load contract storage lazily (efficient for large or partial reads/updates)
            var storage = lazy Storage.load();

            storage.counter -= 15;
            storage.save();
        }

        else => {
            // ignore empty messages, "wrong opcode" for others
            assert (in.body.isEmpty()) throw 0xABCD
        }
    }
}

get fun currentCounter(): int {
    val storage = lazy Storage.load();
    return storage.counter;
}

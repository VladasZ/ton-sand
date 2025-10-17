deploy:
	npx blueprint run deploy --testnet --mnemonic --tonviewer

get:
	npx blueprint run getCounter --mnemonic --testnet

reset:
	npx blueprint run sendReset --testnet --mnemonic --tonviewer

inc:
	npx blueprint run sendIncrease --testnet --mnemonic --tonviewer

sand:
	npx blueprint run sand --testnet --mnemonic --tonviewer

build:
	npx blueprint build VladasSand

lint:
	cargo clippy \
      -- \
      \
      -W clippy::all \
      -W clippy::pedantic \
      \
      -A clippy::module_inception \
      \
      -D warnings

test:
	cargo test --all
	cargo test --all --release

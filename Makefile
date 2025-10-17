deploy:
	npx blueprint run deploySand --testnet --mnemonic --tonviewer

get:
	npx blueprint run getCounter --mnemonic --testnet

reset:
	npx blueprint run resetSand --testnet --mnemonic --tonviewer

inc:
	npx blueprint run incrementSand --testnet --mnemonic --tonviewer

sand:
	npx blueprint run sand --testnet --mnemonic --tonviewer

build:
	npx blueprint build Sand

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

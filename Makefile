.PHONY: build

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


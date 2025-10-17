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

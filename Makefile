deploy:
	npx blueprint run deployVladasSand --testnet --tonconnect --tonviewer

get:
	npx blueprint run getCounter --testnet --tonconnect

reset:
	npx blueprint run sendReset --testnet --tonconnect --tonviewer

inc:
	npx blueprint run sendIncrease --testnet --tonconnect --tonviewer

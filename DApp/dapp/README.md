web3 examples to allow interacting with IPFS and smart contracts.

## This is intended as a guide.

You will need to deploy and change the hard-coded contract addresses and pub/priv keypairs within the example env file. Change to `.env` in order to import values.

There is poor / non-existent error handling  - use at your risk !!

## NodeJS project supporting IPFS, Web3JS and EthersJS
- IPFS
- ERC721 contract

Please change `/public/index.html` to anything else - this is picked up automatically by NodeJs and served.

Run from project root using:
`node src/app.js`

---

## Vanilla JS project supporting EthersJS and MetaMask
- ERC721 contract

Please revert `/public/index.html` to it's original name if changed.

Run from /public using:
`python3 -m http.server 3000`

    

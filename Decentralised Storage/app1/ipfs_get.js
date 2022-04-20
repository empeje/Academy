const IPFS = require('ipfs');
const all = require('it-all');

(async () => {
  const node = await IPFS.create();

  const cid = 'QmWY1WdGzxZiWz2T4x7hEhhrR8HyisrQbXAGeVd2gtiFYo';

  const data = Buffer.concat(await all(node.cat(cid)));

  console.log(data.toString());
})();

const erc721Address = '0x9084BFD26E950CAA6D29CaeaF795Ed6E1Ca26C83';
const nftAbi = '../contracts/EncodeErc721.json';

$(() => {
  $(window).load(() => init());
});

async function init() {
  await App.initWeb3();
  await App.initContract();
  await App.bindEvents();
}

App = {
  provider: null,
  account: {},
  contracts: {},

  initWeb3: async () => {
    if (window.ethereum) {
      App.provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        await App.provider.send('eth_requestAccounts', []);
        App.signer = App.provider.getSigner();
        console.log('Live account:', await App.signer.getAddress());
        App.account.owner = App.signer.getAddress();
      } catch (error) {
        console.log(error.toString());
        console.error('User denied access to accounts');
      }
    } else {
      console.error('Please use a browser with MetaMask.');
    }
  },

  initContract: () => {
    $.getJSON(nftAbi, (data) => {
      App.NftContract = new ethers.Contract(erc721Address, data, App.signer);
    });
  },

  bindEvents: () => {
    // DOM components
    inputBox = document.getElementById('input-text');
    cidBox = document.getElementById('ipfs-request');
    ownerInput = document.getElementById('owner-input');
    uriInput = document.getElementById('uri-input');
    txFrom = document.getElementById('tx-from');
    txTo = document.getElementById('tx-to');
    tokenId = document.getElementById('token-id');
    // Function calls
    $(document).on('click', '#mint-nft', function () {
      App.mintNFt(ownerInput.value, uriInput.value);
    });
    $(document).on('click', '#get-nfts', function () {
      App.getNfts(ownerInput.value);
    });
    $(document).on('click', '#tx-nft', function () {
      App.txNft(txFrom.value, txTo.value, tokenId.value);
    });
  },

  mintNFt: async (to, uri) => {
    console.log(ownerInput.value, uriInput.value);
    const _txHash = await App.NftContract.safeMint(
      ownerInput.value,
      uriInput.value,
    );
    $('#output-text').val(_txHash.hash);
  },

  getNfts: async (address) => {
    const nfts = await App.NftContract.getNfts(address);
    let nftArr = [];
    for (const tokenId of nfts) {
      if (tokenId.toString() != 0) {
        nftArr.push({ [tokenId]: await App.getUri(tokenId) });
      }
    }
    $('#output-text').val(JSON.stringify(await nftArr));
  },

  getUri: async (tokenId) => {
    const uri = await App.NftContract.tokenURI(tokenId);
    return await uri;
  },

  txNft: async (from, to, tokenId) => {
    console.log(from, to, tokenId);
    const _txHash = await App.NftContract.transferNft(from, to, tokenId);
    $('#output-text').val(_txHash.hash);
  },
};

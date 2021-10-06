const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(
  "https://mainnet.infura.io/v3/23f19e217c46487b810e89ded79fc362"
);

let polkaTokenEth = "0x83e6f1E41cdd28eAcEB20Cb649155049Fac3D5Aa";

const address = require("./address.json");

const ABI = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

async function main() {
  let contract = await new web3.eth.Contract(ABI, polkaTokenEth);

  const result = [];

  for (let i = 0; i < address.length; i++) {
    let res = await contract.methods.balanceOf(address[i]).call();
    if (res / 10 ** 18 > 250) {
      console.log(res / 10 ** 18);
      result.push(address[i]);
    }
  }

  //write result to file
  fs.writeFileSync(
    "./results/addressEth.json",
    JSON.stringify(result),
    function (err) {
      if (err) return console.log(err);
    }
  );
}
main();

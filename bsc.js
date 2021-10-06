const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3("https://bsc-dataseed.binance.org/");

let polkaTokenBsc = "0x7e624fa0e1c4abfd309cc15719b7e2580887f570";

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
  let contract = await new web3.eth.Contract(ABI, polkaTokenBsc);

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
    "./results/addressBsc.json",
    JSON.stringify(result),
    function (err) {
      if (err) return console.log(err);
    }
  );
}
main();

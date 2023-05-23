// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const contract = await ethers.getContractFactory("KryptoAmir");
  const Market = await contract.deploy();
  await Market.deployed();
  const MarketAddress = Market.address;

  let ListingPrice = await Market.GetListingPrice();
  // ListingPrice = ListingPrice.tostring();

  const Setauctionprice = await ethers.utils.parseUnits("100", "ether");

  const nftContract = await ethers.getContractFactory("NFT");
  const NFT = await nftContract.deploy(MarketAddress);
  await NFT.deployed();
  const NFTContractAddress = NFT.address;

  console.log("deployed all contract successfuly");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

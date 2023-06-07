const { expect, assert } = require("chai");
const { ethers, utils } = require("hardhat");

describe("KryptoAmir", function () {
  let Market,
    NFT,
    MarketContractAddress,
    NFTContractAddress,
    listingPrice,
    auctionPrice,
    tokenId,
    owner,
    TokenId
    ;

  auctionPrice = ethers.utils.parseUnits("10", "ether");

  beforeEach(async function () {
    const MarketContract = await ethers.getContractFactory("KryptoAmir");
    Market = await MarketContract.deploy();
    await Market.deployed();
    MarketContractAddress = Market.address;

    const NFTcontract = await ethers.getContractFactory("NFT");
    NFT = await NFTcontract.deploy(MarketContractAddress);
    await NFT.deployed();
    NFTContractAddress = NFT.address;
  });

  it("should get the listing Price", async function () {
    listingPrice = await Market.GetListingPrice();
    listingPrice = listingPrice.toString();

    assert.equal(await Market.GetListingPrice(), listingPrice);
  });

  it("should mint a new token in NFT contract", async function () {
    tokenId = await NFT.mintToken("http-Token1");
    // tokenId = tokenId.toString();
    // Perform necessary assertions or checks here
    // TokenId = utils.keccak256(utils.toUtf8Bytes(tokenId))
    TokenId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(tokenId));
  });


  it("should be return the owner of token id", async function () {
    owner = NFT.getOwnerMintedToken(tokenId);
    owner = owner.toString();
  });

  // console.log(owner);

  it("should sell NFT in the Market", async function () {
    await Market.sell(NFTContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    // Perform necessary assertions or checks here
  });
});

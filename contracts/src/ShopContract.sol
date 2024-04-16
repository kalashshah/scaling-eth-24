// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

interface NFTInterface {
    function safeMint(address to) external;
}

contract ShopContract {
    struct NFTListing {
        address nftAddress;
        uint256 price;
    }

    IERC20 GTLToken;
    event NFTBought(address indexed buyerAddress, address nftAddress);

    address public GLTaddress;
    NFTListing[] public airwayNFTs;
    mapping(address => uint256) public addressToNFTIndex;
    address ownerAddress;

    constructor(address tokenAddress) {
        GLTaddress = tokenAddress;
        ownerAddress = msg.sender;
    }

    function addAirwayNfts(NFTListing memory nft) public {
        require(ownerAddress == msg.sender);
        addressToNFTIndex[nft.nftAddress] = airwayNFTs.length;
        airwayNFTs.push(nft);
    }

    function buyNFT(address nftAddress) public payable {
        uint256 price = airwayNFTs[addressToNFTIndex[nftAddress]].price;
        require(
            IERC20(GLTaddress).transferFrom(msg.sender, address(this), price)
        );
        NFTInterface(nftAddress).safeMint(msg.sender);

        emit NFTBought(msg.sender, nftAddress);
    }
}

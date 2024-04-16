// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract HazureAirNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    mapping(address => bool) distributors;

    constructor() ERC721("KitaiAirNFT", "KIANFT") Ownable(msg.sender) {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://res.cloudinary.com/drlni3r6u/image/upload/v1713206379/gnosis-lounge/Gemini_Generated_Image_7rqfs87rqfs87rqf_jwaijk.jpg";
    }

    function addDistributors(address distributorAddress) public onlyOwner {
        distributors[distributorAddress] = true;
    }

    function safeMint(address to) public {
        require(distributors[msg.sender] == true);
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract KitaiAirNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("KitaiAirNFT", "KIANFT") Ownable(msg.sender) {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://res.cloudinary.com/drlni3r6u/image/upload/v1713206376/gnosis-lounge/Gemini_Generated_Image_ta5hmita5hmita5h_yxtwx9.jpg";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}

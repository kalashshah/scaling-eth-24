// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/PlonkVerifier.sol";
import "../src/TransactionValidator.sol";
import "../src/GnosisLoungeToken.sol";
import "../src/KitaiAirNFT.sol";
import "../src/HazureAirNFT.sol";
import "../src/ShopContract.sol";

struct NFTListing {
    address nftAddress;
    uint256 price;
}

contract TransactionValidatorScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // PlonkVerifier pv = new PlonkVerifier();
        // address plonkAddress = 0x5B2B5b8D8Fc731D4403a585B8D0CfdF114727460;
        // TransactionValidator sm = new TransactionValidator(plonkAddress);

        // GnosisLoungeToken glt = new GnosisLoungeToken();

        // ShopContract shopContract = new ShopContract(gltToken);

        // KitaiAirNFT kitaiAirNFT = new KitaiAirNFT();
        // HazureAirNFT hazureAirNFT = new HazureAirNFT();

        // kitaiAirNFT.addDistributors(address(shopContract));
        // hazureAirNFT.addDistributors(address(shopContract));

        addToShop();

        vm.stopBroadcast();
    }

    function transferTokenToUser(address userAddress) public {
        address gltTokenAddress = 0xA231E1899258016BB9AFa8a955860D68576697B4;
        GnosisLoungeToken glt = GnosisLoungeToken(gltTokenAddress);

        glt.transfer(userAddress, 100 * (10 ** 18));
    }

    function addToShop() public {
        address shopContractAddr = 0x6bcc580520c43f44E6F3841766914F76243ff286;
        ShopContract shopContract = ShopContract(shopContractAddr);

        address KitaiAirNFTAddr = 0xd71AF9C34f83c09389A101B8A0760B5866F6886E;
        address HazureAirNFTAddr = 0x2881C0e106a10d5c580aEE52D132C2e175B9a797;

        ShopContract.NFTListing memory kitaiAirNFTinstance = ShopContract
            .NFTListing({nftAddress: KitaiAirNFTAddr, price: 10 * (10 ** 18)});

        ShopContract.NFTListing memory hazureAirNFTinstance = ShopContract
            .NFTListing({nftAddress: HazureAirNFTAddr, price: 20 * (10 ** 18)});

        shopContract.addAirwayNfts(kitaiAirNFTinstance);
        shopContract.addAirwayNfts(hazureAirNFTinstance);
    }
}

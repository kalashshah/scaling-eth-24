// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/PlonkVerifier.sol";
import "../src/TransactionValidator.sol";
import "../src/GnosisLoungeToken.sol";
import "../src/KitaiAirNFT.sol";
import "../src/HazureAirNFT.sol";

contract TransactionValidatorScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // PlonkVerifier pv = new PlonkVerifier();
        // address plonkAddress = 0x5B2B5b8D8Fc731D4403a585B8D0CfdF114727460;
        // TransactionValidator sm = new TransactionValidator(plonkAddress);

        // GnosisLoungeToken glt = new GnosisLoungeToken();

        KitaiAirNFT kitaiAirNFT = new KitaiAirNFT();
        HazureAirNFT hazureAirNFT = new HazureAirNFT();

        vm.stopBroadcast();
    }
}

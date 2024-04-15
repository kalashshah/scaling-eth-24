// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

// Interface to PlonkVerifier.sol
interface IPlonkVerifier {
    function verifyProof(
        uint256[24] calldata _proof,
        uint256[1] calldata _pubSignals
    ) external view returns (bool);
}

contract TransactionValidator {
    address public s_plonkVerifierAddress;
    address public ownerAddress;

    event ProofResult(bool result);

    constructor(address plonkVerifierAddress) {
        s_plonkVerifierAddress = plonkVerifierAddress;
        ownerAddress = msg.sender;
    }

    mapping(address => uint256) public whitelistedAddressToTime;

    function whitelistAddress(address userAddress) public {
        whitelistedAddressToTime[userAddress] = block.timestamp;
    }

    function isVerified(address userAddess) public view returns (bool) {
        return
            whitelistedAddressToTime[userAddess] > (block.timestamp - 2592000);
    }

    // ZK proof is generated in the browser and submitted as a transaction w/ the proof as bytes.
    function submitProof(
        uint256[24] calldata proof,
        uint256[1] calldata pubSignals,
        address toWhitelistAddress
    ) public returns (bool) {
        bool result = IPlonkVerifier(s_plonkVerifierAddress).verifyProof(
            proof,
            pubSignals
        );
        emit ProofResult(result);
        if (result == true) {
            whitelistAddress(toWhitelistAddress);
        }
        return result;
    }
}

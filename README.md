**Project Demo**
Head over to https://ethglobal.com/showcase/gnosis-lounge-3dqdk to view the demo video of the project

**Prequisites**
- Please use the project in iphone14 pro max dimensions using inspector for the best experience
- Need to have a delay module associated to your safe 
- Need to have some initial supply of GLT please raise an issue with your address and we will send them over to you
- Need to have a few mainnet funds to cover for gas


**Project Overview**:

The objective is to establish a comprehensive loyalty and rewards program tailored for Gnosis Pay cardholders. While envisioning a universal protocol for loyalty and rewards within the Gnosis ecosystem, we're launching a proof of concept (POC) focused on Airport Lounge access.

*Key Features of the POC:*

- User authentication involves linking their EoA and specifying their safe address. Upon validation of the safe address and retrieval of the delay module, users are prompted to sign terms and conditions via EthSign before proceeding.
- Upon login, users are directed to the home screen where they can view their card details, transaction history (sourced from Gnosis APIs), and their POAPs, which they can mint for free on the Gnosis platform, post checking in to the lounge. Additionally, users can check in to the airport lounge.
- The check-in process generates a zero-knowledge proof indicating the user's transaction history surpasses a defined threshold. This proof is presented to lounge staff for verification on-chain. Upon successful verification, users can mint their POAP and access the lounge store.
- The lounge store showcases various offerings, including airline loyalty NFTs. Ownership of these NFTs unlocks eligibility for airdrops and other rewards.
- Integration with Heartbit enables on-chain analysis of user behavior, providing invaluable insights for partnered brands showcased in the lounge store.
- Users can purchase NFTs using the Gnosis Pay delay module. Upon NFT minting, users receive cashback in the form of random "Gnosis Lounge Tokens," enhancing engagement and loyalty.

*Future Scope and Vision:*

- Enhance the complexity of zero-knowledge proof circuits and parameters, ensuring heightened security and privacy for users.
- Develop a versatile foundational platform adaptable to diverse use cases beyond lounge access, fostering broader adoption and innovation within the Gnosis ecosystem.
- Elevate the intrinsic value of "Gnosis Lounge Tokens" by forging strategic partnerships with renowned brands. Reward users for every transaction made with the Gnosis card, fostering a symbiotic relationship between users, merchants, and the Gnosis platform.

This visionary roadmap seeks to propel the Gnosis loyalty and rewards program into a dynamic ecosystem where seamless transactions, privacy, and meaningful engagement converge to redefine user experiences and foster long-term loyalty.

**Gnosis Integration**

- Integrated the gnosis pay delay module into the store for purchasing NFTs and getting cashback on purchases using a lambda function that generates a random number. All purchases in-store will be paid from and executed via the gnosis pay delay module to simulate a gnosis pay card transaction.

- Used the HeartBit SDK to enable on-chain analytics for the store to analyse and report to airlines which will in future, add their products to our store. Using this they can take advantage of user engagement, improve their in-store inventory and in turn bring more users back.

- All the contracts for the shop, ERC20 tokens, NFTs, ZK proof verifier, transaction validator were deployed on the Gnosis Mainnet.

**Sign Protocol Integration**

⁠Sign Protocol was employed so that users can digitally sign the terms and conditions of the application and to unlock exclusive access to prestigious airport lounges with unparalleled convenience.


**Contract Addresses on Gnosis**:

PLONK_VERIFIER_ADDR: `0x887ECa7008180B6e7C0F8904E1ed0C529aa6A84C`,

TRANSACTION_VALIDATOR_ADDR: `0xB150F32383D2a8dbfdCd35b99ce805833560C074`,

GNOSIS_LOUNGE_ERC20_ADDR: `0xCc4A6407B36120f21ff21d0F7Eef23DBEaD2A977`,

SHOP_ADDR: `0xF3C05f8f1271868E925535c5731A53d310C7c4f5`,

KITAI_NFT_ADDR: `0x7Ba34Df70A46bf83DdB29801A7ee9a2a3D312e4b`

**Address used for testing**: 

SAFE_ADDRESS : `0x5D9846dBE66e6973Ef856dedAD2b0a58eB9Dd249`

DELAY_MODULE : `186A1f0238cB56D231DD7197ca7c904BE971f`

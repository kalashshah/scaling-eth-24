export const isTest = false;

const SepoliaAddresses = {
  TRANSACTION_VALIDATOR_ADDR:
    "0xB5c1a3B371D6676ccd4A4e46D732681F6F94Fe8f" as `0x${string}`,
  PLONK_VERIFIER_ADDR:
    "0x5b2b5b8d8fc731d4403a585b8d0cfdf114727460" as `0x${string}`,
  GLT_ADDR: "0xA231E1899258016BB9AFa8a955860D68576697B4" as `0x${string}`,
  KITAI_NFT_ADDR: "0xd71AF9C34f83c09389A101B8A0760B5866F6886E" as `0x${string}`,
  HAZURE_NFT_ADDR:
    "0x2881C0e106a10d5c580aEE52D132C2e175B9a797" as `0x${string}`,
  SHOP_ADDR: "0x6bcc580520c43f44E6F3841766914F76243ff286" as `0x${string}`,
};

const GnosisAddresses = {
  PLONK_VERIFIER_ADDR:
    "0x887ECa7008180B6e7C0F8904E1ed0C529aa6A84C" as `0x${string}`,
  TRANSACTION_VALIDATOR_ADDR:
    "0xB150F32383D2a8dbfdCd35b99ce805833560C074" as `0x${string}`,
  GLT_ADDR: "0xCc4A6407B36120f21ff21d0F7Eef23DBEaD2A977" as `0x${string}`,
  SHOP_ADDR: "0xF3C05f8f1271868E925535c5731A53d310C7c4f5" as `0x${string}`,
  KITAI_NFT_ADDR: "0x7Ba34Df70A46bf83DdB29801A7ee9a2a3D312e4b" as `0x${string}`,
};

export const Addresses = isTest ? SepoliaAddresses : GnosisAddresses;

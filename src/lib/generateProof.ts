import path from "path";
// @ts-ignore
import * as snarkjs from "snarkjs";

export const generateProof = async (input0: number) => {
  const inputs = {
    in: [input0],
  };

  const wasmPath = path.join(
    process.cwd(),
    "circuits/build/transactions_validator_js/transactions_validator.wasm"
  );
  const provingKeyPath = path.join(
    process.cwd(),
    "circuits/build/proving_key.zkey"
  );

  try {
    const { proof, publicSignals } = await snarkjs.plonk.fullProve(
      inputs,
      wasmPath,
      provingKeyPath
    );
    const calldataBlob = await snarkjs.plonk.exportSolidityCallData(
      proof,
      publicSignals
    );
    let proofString;
    let publicSignalsString;

    const regex = /\[([^[]+)]\[([^[]+)]/;
    const match = calldataBlob.match(regex);

    if (match) {
      proofString = match[1];
      publicSignalsString = match[2];

      proofString = JSON.parse(`[${proofString}]`);
      publicSignalsString = JSON.parse(`[${publicSignalsString}]`);
    }

    return {
      proof: proofString,
      publicSignals: publicSignalsString,
    };
  } catch (err) {
    return {
      proof: "",
      publicSignals: [],
    };
  }
};

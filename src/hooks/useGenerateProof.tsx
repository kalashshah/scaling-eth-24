import * as path from "path";
// @ts-ignore
import * as snarkjs from 'snarkjs';

export const useGenerateProof = ()=>{
    const generateProof = async (input0: number): Promise<any> => {
        console.log(`Generating vote proof with inputs: ${input0}`);
        
        // We need to have the naming scheme and shape of the inputs match the .circom file
        const inputs = {
          in: [input0],
        }
      
        // Paths to the .wasm file and proving key
        const wasmPath = './simple_multiplier.wasm'
        const provingKeyPath = './proving_key.zkey'
        try {
          // Generate a proof of the circuit and create a structure for the output signals
          const { proof, publicSignals } = await snarkjs.plonk.fullProve(inputs, wasmPath, provingKeyPath);
          console.log("hereere")
          // Convert the data into Solidity calldata that can be sent as a transaction
          const calldataBlob = await snarkjs.plonk.exportSolidityCallData(proof, publicSignals);
          const calldata = calldataBlob.split(',');
      
          console.log(calldata);
      
          return {
            proof: calldata[0], 
            publicSignals: JSON.parse(calldata[1]),
          }
        } catch (err) {
          console.log(`Error:`, err)
          return {
            proof: "", 
            publicSignals: [],
          }
        }
    }

    console.log(`UseGenerateProof : ${generateProof}`);

    return {generateProof}
}



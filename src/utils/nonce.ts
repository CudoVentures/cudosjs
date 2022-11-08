
import { defaultRegistryTypes, fromBase64 } from "../stargate";
import { StdSignature, encodeSecp256k1Pubkey, decodeSignature, coins, pubkeyToAddress } from "../amino";
import { EncodeObject, makeAuthInfoBytes, makeSignBytes, makeSignDoc, Registry, TxBodyEncodeObject } from "@cosmjs/proto-signing";
import { Int53 } from "../math";
import { Secp256k1, Secp256k1Signature, sha256 } from "../crypto";

export async function verifyNonceMsgSigner(signature: StdSignature, signerAddress: string, nonce: number, sequence: number, accountNumber: number, chainId: string): Promise<boolean> {
    const txBody = encodeNonce(nonce);
    const bodyBytes = new Registry(defaultRegistryTypes).encode(txBody);

    const pubKeyRaw = decodeSignature(signature).pubkey;
    const pubkey = encodePubKey(pubKeyRaw);
    const gasLimit = Int53.fromString("0").toNumber();
    const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence }], coins(0, "acudos"), gasLimit);
    const signDoc = makeSignDoc(bodyBytes, authInfoBytes, chainId, accountNumber);
    
    const msgHash = sha256(makeSignBytes(signDoc));
    const sigSecp256 = Secp256k1Signature.fromFixedLength(fromBase64(signature.signature))
    const valid = await Secp256k1.verifySignature(sigSecp256, msgHash, pubKeyRaw);
    const signerRecovered = pubkeyToAddress(encodeSecp256k1Pubkey(pubKeyRaw), "cudos");

    return valid && signerRecovered === signerAddress
}

export function encodePubKey(pubkey: Uint8Array): EncodeObject {
    const pubkeySecp256 = encodeSecp256k1Pubkey(pubkey).value
    return {
        typeUrl: "/cosmos.crypto.secp256k1.PubKey",
        value: fromBase64(pubkeySecp256),
    };
}

export function encodeNonce(nonce: number): TxBodyEncodeObject {
    return {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
            messages: [{
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: { amount: coins(0, "acudos") },
            },],
            memo: `Nonce: ${nonce}`,
        },
    };
}
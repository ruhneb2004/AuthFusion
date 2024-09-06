import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http, publicActions, recoverMessageAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";


const privateKey = process.env.SIGNER_SECRET_KEY || "";

const account = privateKeyToAccount(privateKey as `0x${string}`);
console.log(account);

 

export const POST = async (req: NextRequest) => {
  const { mes } = await req.json();
  console.log(mes);

  const walletClient = createWalletClient({
    account,
    chain: mainnet,
    transport: http(),
  }).extend(publicActions);

  const signature = await walletClient.signMessage({
    message: mes,
  });

  const valid = await walletClient.verifyMessage({
    address: account.address,
    message: mes,
    signature,
  });

  const signingAddress = await recoverMessageAddress({
    message: mes,
    signature,
  });
  console.log(signingAddress);

  // const arraified = toBytes(signature);

  console.log("is this valid " + valid);

  // Return the signature in the response
  return NextResponse.json({ signature });
};
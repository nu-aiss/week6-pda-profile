import fs from "fs";
import os from "os";
import path from "path";

import {
  AnchorProvider,
  Program,
  setProvider,
  Wallet,
} from "@anchor-lang/core";

import {
  Connection,
  Keypair,
  PublicKey,
} from "@solana/web3.js";

import idl from "../target/idl/week6_pda_profile.json";
import type { Week6PdaProfile } from "../target/types/week6_pda_profile";

const DEVNET_URL = "https://api.devnet.solana.com";

async function main() {
  const walletPath = path.join(
    os.homedir(),
    ".config",
    "solana",
    "id.json"
  );

  const secretKey = Uint8Array.from(
    JSON.parse(fs.readFileSync(walletPath, "utf8"))
  );

  const payer = Keypair.fromSecretKey(secretKey);

  const connection = new Connection(
    DEVNET_URL,
    "confirmed"
  );

  const wallet = new Wallet(payer);

  const provider = new AnchorProvider(
    connection,
    wallet,
    {
      commitment: "confirmed",
    }
  );

  setProvider(provider);

  const program = new Program<Week6PdaProfile>(
    idl as Week6PdaProfile,
    provider
  );

  const [profilePda, bump] =
    PublicKey.findProgramAddressSync(
      [
        Buffer.from("profile"),
        payer.publicKey.toBuffer(),
      ],
      program.programId
    );

  console.log(
    "Program ID:",
    program.programId.toBase58()
  );

  console.log(
    "Wallet:",
    payer.publicKey.toBase58()
  );

  console.log(
    "Profile PDA:",
    profilePda.toBase58()
  );

  console.log(
    "PDA bump:",
    bump
  );

  console.log("\n1. Creating profile...");

  const createTx = await program.methods
  .createProfile(
    "Aisana",
    "Solana student"
  )
  .accounts({
    user: payer.publicKey,
  })
  .rpc();

  console.log(
    "Create profile transaction:",
    createTx
  );

  let profileData =
    await program.account.profile.fetch(
      profilePda
    );

  console.log(
    "Profile name:",
    profileData.name
  );

  console.log(
    "Profile bio:",
    profileData.bio
  );

  console.log(
    "Profile owner:",
    profileData.owner.toBase58()
  );

  console.log("\n2. Updating profile...");

  const updateTx = await program.methods
  .updateProfile(
    "Aisana Nurgali",
    "Solana and Anchor student"
  )
  .accounts({
    user: payer.publicKey,
  })
  .rpc();

  console.log(
    "Update profile transaction:",
    updateTx
  );

  profileData =
    await program.account.profile.fetch(
      profilePda
    );

  console.log(
    "Updated name:",
    profileData.name
  );

  console.log(
    "Updated bio:",
    profileData.bio
  );

  console.log(
    "Stored bump:",
    profileData.bump
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
import { ethers } from "ethers";
export const CHAIN_RPC = "https://bsc-dataseed.binance.org";
export const CHAIN_ID = 56

const provider = new ethers.providers.JsonRpcProvider(CHAIN_RPC);
export default provider;

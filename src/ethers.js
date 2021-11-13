import { ethers } from "ethers";
const CHAIN_RPC = "https://bsc-dataseed.binance.org";

const provider = new ethers.providers.JsonRpcProvider(CHAIN_RPC);
export default provider;

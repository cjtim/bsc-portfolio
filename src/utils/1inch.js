import axios from "axios";
import { CHAIN_ID } from "./ethers.js";

const USDT = "0x55d398326f99059ff775485246999027b3197955";

export default class OneInch {
  /**
   * @async
   * @param {string} tokenContract
   * @param {number} amount
   */
  static async getPrice(tokenContract, amount = 10 ** 18) {
    const { data } = await axios.get(
      `https://api.1inch.exchange/v3.0/${CHAIN_ID}/quote`,
      {
        params: {
          fromTokenAddress: tokenContract,
          toTokenAddress: USDT,
          amount: amount,
        },
      }
    );
    const { toTokenAmount } = data;
    const { decimals } = data.toToken;
    return parseInt(toTokenAmount) / 10 ** decimals;
  }
}

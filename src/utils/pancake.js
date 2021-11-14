import axios from "axios";
import { ethers, utils } from "ethers";
import provider from "./ethers.js";

const daiAbi = ["function totalSupply() public view returns (uint256)"];
const cake_bnb_pair =
  "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82_0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const cake_lp_token = "0x0ed7e52944161450477ee417de9cd3a859b14fd0";

export default class Pancake {
    /**
     * @async
     * @param {number} amount 
     * @returns {number}
     */
  static async getCakeBNBPrice(amount) {
    const contract = new ethers.Contract(cake_lp_token, daiAbi, provider);
    const [total_supply, resp] = await Promise.all([
      contract.totalSupply(),
      axios.get("https://api.pancakeswap.info/api/v2/pairs"),
    ]);
    const total_lp = utils.formatUnits(total_supply);

    const { liquidity } = resp.data.data[cake_bnb_pair];
    const lp_ratio = amount / total_lp;
    return liquidity * lp_ratio;
  }
}

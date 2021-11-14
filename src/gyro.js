import axios from "axios";
import { ethers, utils } from "ethers";
import OneInch from "./1inch.js";
import provider from "./ethers.js";

const StakeGyroContract = "0xdc93eb0eb1bf2ac6da14b3ee54a8d7fbb15bb058";
const gyroToken = "0x1b239abe619e74232c827fbe5e49a4c072bd869d";

const daiAbi = [
  "function balanceOf(address _user) public view returns (uint256)",
  "function decimals() public view returns (uint8)",
];

export default class Gyro {
  /**
   *
   * @async
   * @param {string} wallet
   * @returns {Promise<string>}
   */
  static async getStake(wallet) {
    const contract = new ethers.Contract(StakeGyroContract, daiAbi, provider);
    const [sGyro, decimals] = await Promise.all([
      contract.balanceOf(wallet),
      contract.decimals(),
    ]);
    return parseFloat(utils.formatUnits(sGyro)) * 10 ** decimals;
  }

  static async getPrice() {
    const contract = new ethers.Contract(StakeGyroContract, daiAbi, provider);
    const decimals = await contract.decimals();
    return OneInch.getPrice(gyroToken, 10 ** decimals);
  }
}

import { ethers, utils } from "ethers";
import OneInch from "../utils/1inch.js";
import provider from "../utils/ethers.js";

const XMSToken = "0x7859b01bbf675d67da8cd128a50d155cd881b576";
const MarsContract = "0xb7881f5142245531c3fb938a37b5d2489efd2c01";
const CAKE_BNB_PAIR_PID = "1";
const daiAbi = [
  "function pendingToken(uint256 _pid, address _user) public view returns (uint256)",
];

export default class MarsEcosystem {
  /**
   *
   * @async
   * @param {string} wallet
   * @returns {Promise<string>}
   */
  static async getStake(wallet) {
    const contract = new ethers.Contract(MarsContract, daiAbi, provider);
    const cake_bnb = await contract.pendingToken(CAKE_BNB_PAIR_PID, wallet);
    return utils.formatUnits(cake_bnb);
  }

  static async getPrice() {
    return OneInch.getPrice(XMSToken);
  }
}

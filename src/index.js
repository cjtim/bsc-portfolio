import { CronJob } from "cron";
import { utils } from "ethers";
import provider from "./ethers.js";
import Gyro from "./gyro.js";
import MarsEcosystem from "./mars.js";
import Pancake from "./pancake.js";
import { logFile, startServer } from "./utils.js";

const WALLET = process.env.WALLET;
if (!WALLET) {
  console.error("WALLET environment not found");
  process.exit(1);
}

async function main() {
  const [cake_bnb, xmsPrice, bnb, sGyro, gyroPrice, cake_bnb_worth] =
    await Promise.all([
      MarsEcosystem.getStake(WALLET),
      MarsEcosystem.getPrice(),
      provider.getBalance(WALLET),
      Gyro.getStake(WALLET, provider),
      Gyro.getPrice(),
      Pancake.getCakeBNBPrice(1.72),
    ]);

  const json = {
    bnb: utils.formatEther(bnb),
    mars_pending: cake_bnb,
    mars_price: xmsPrice,
    mars_worth: xmsPrice * cake_bnb,
    gyro_staking: sGyro,
    gyro_price: gyroPrice,
    gyro_worth: sGyro * gyroPrice,
    cake_bnb_worth,
  };
  logFile(JSON.stringify(json));
}

var job = new CronJob(
  "1 * * * * *",
  function () {
    main().catch((e) => {
      logFile(JSON.stringify({ error: e.message }));
    });
  },
  null,
  true,
  "Asia/Bangkok",
  null,
  true
);

job.start();

process.on("SIGTERM", () => {
  job.stop();
  app.close();
});
process.on("SIGINT", () => {
  job.stop();
  app.close();
});

const app = startServer();

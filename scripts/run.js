const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  //to get wallet address of owner and random person
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // to generate necesary artifacts
  const waveContract = await waveContractFactory.deploy();
  // Hardhat will create a local ethereum network for us, just for this contract and destroys network once script completes
  await waveContract.deployed();
  //wait till the contract is deployed

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  await waveContract.getTotalWaves();
  //total waves so far

  const firstWaveTxn = await waveContract.wave();
  await firstWaveTxn.wait();
  //to add the first wave

  await waveContract.getTotalWaves();
  //total waves so far

  const secondWaveTxn = await waveContract.connect(randomPerson).wave();
  await secondWaveTxn.wait();
  // add a second wave, this time by the random person

  await waveContract.getTotalWaves();
  //total waves so far
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); //exit node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); //exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();

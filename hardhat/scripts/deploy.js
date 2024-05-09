const hre = require("hardhat");

// Voodoo deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Safe deployed to 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

async function main() {
  // Deploy Voodoo Token
  // const Voodoo = await hre.ethers.getContractFactory("Voodoo");
  // const voodoo = await Voodoo.deploy();
  // console.log(`Voodoo deployed to ${voodoo.target}`);

  let voodooAddress = "0x922C66aaF3055902502906C88aadB29d21856bEF";

  // Deploy Magic Token
  // const Magic = await hre.ethers.getContractFactory("Magic");
  // const magic = await Magic.deploy();
  // console.log(`Magic deployed to ${magic.target}`);

  let magicAddress = "0x11A647a0B9E6DDffA611dC54c00A38D6a8DC2324";

  // Deploy Poison Token
  // const Poison = await hre.ethers.getContractFactory("Poison");
  // const poison = await Poison.deploy();
  // console.log(`Poison deployed to ${poison.target}`);

  let poisonAddress = "0x89F298b657b19037083eFc7Eb056bcE46b83dbCF"

  // Deploy FortuneWheel Contract with the target of the deployed Tokens
  const FortuneWheel = await hre.ethers.getContractFactory("FortuneWheel");
  const fortuneWheel = await FortuneWheel.deploy(magicAddress, poisonAddress, voodooAddress);
  console.log(`FortuneWheel deployed to ${fortuneWheel.target}`);

  // 0x07544EBae90c13F491b78c7DBeE625aC563b2Ba3
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

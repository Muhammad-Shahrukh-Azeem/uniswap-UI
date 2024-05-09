import { ethers } from 'ethers';
import ERC20 from "./ERC20.json" assert { type: 'json' };
import FortuneWheel from "./FortuneWheel.json" assert { type: 'json' };

// let provider = new ethers.JsonRpcProvider("https://rpc.pulsechain.com"); // MAINNET
let provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/feB5u-s6-eZrV7lkC9RES4IQpNVTD0PY"); // TESTNET

// TestNet Addresses Mumbai
const VDOTokenAddress = "0x922C66aaF3055902502906C88aadB29d21856bEF";
const MGTokenAddress = "0x11A647a0B9E6DDffA611dC54c00A38D6a8DC2324";
const PNTokenAddress = "0x89F298b657b19037083eFc7Eb056bcE46b83dbCF";
const FortuneAddress = "0x07544EBae90c13F491b78c7DBeE625aC563b2Ba3";

export async function balanceOfAll(signer) {
    const voodoo = new ethers.Contract(VDOTokenAddress, ERC20.abi, signer);
    const magic = new ethers.Contract(MGTokenAddress, ERC20.abi, signer);
    const poison = new ethers.Contract(PNTokenAddress, ERC20.abi, signer);
    const address = await signer.getAddress();

    // Fetch balances for all three tokens
    const voodooBalanceWei = await voodoo.balanceOf(address);
    const magicBalanceWei = await magic.balanceOf(address);
    const poisonBalanceWei = await poison.balanceOf(address);

    // Convert balances from Wei to Ether
    const voodooBalanceEther = ethers.utils.formatEther(voodooBalanceWei);
    const magicBalanceEther = ethers.utils.formatEther(magicBalanceWei);
    const poisonBalanceEther = ethers.utils.formatEther(poisonBalanceWei);

    // Return balances as an object
    return {
        voodoo: voodooBalanceEther,
        magic: magicBalanceEther,
        poison: poisonBalanceEther
    };
}



export async function spinWheel(signer) {
    const fortune = new ethers.Contract(FortuneAddress, FortuneWheel.abi, signer);
    try {
        // Trigger the spinWheel function
        const tx = await fortune.spinWheel();

        // Wait for the transaction to be mined and get the receipt
        const receipt = await tx.wait();

        // Parse the event emitted by the contract to extract tokens won
        const spinEvent = receipt.events.find(event => event.event === 'SpinResult');
        const tokensWon = spinEvent.args.tokensWon;

        console.log("Tokens won: ", tokensWon.toString());
        return tokensWon.toString();
    } catch (error) {
        console.error("Spin failed:", error);
        throw error;
    }
}



export async function getUserSpinInfo(signer) {
    const fortune = new ethers.Contract(FortuneAddress, FortuneWheel.abi, signer);
    try {
        const address = await signer.getAddress();

        const [spinsLeft, timeUntilReset] = await fortune.getUserSpinInfo(address);

        const resetHours = Math.floor(timeUntilReset / 3600);
        const resetMinutes = Math.floor((timeUntilReset % 3600) / 60);
        const resetSeconds = timeUntilReset % 60;

        // Create an object with the information to return
        const spinInfo = {
            spinsLeft,
            timeUntilReset, // Raw seconds value, consider formatting if needed for the UI
            formattedTimeUntilReset: `${resetHours} hours, ${resetMinutes} minutes, and ${resetSeconds} seconds`
        };
        return spinInfo;
    } catch (error) {
        console.error("Retrieving user spin information failed:", error);
        throw error; 
    }
}



import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const Pool = () => {
    const { isConnected } = useAccount();
    const [liquidityInfo, setLiquidityInfo] = useState('Connect to a wallet to view your liquidity.');

    useEffect(() => {
        if (isConnected) {
            // Simulate fetching liquidity data
            // This should be replaced with an actual API call or smart contract interaction
            setTimeout(() => {
                setLiquidityInfo('No liquidity found. Don\'t see a pool you joined? Import it.');
            }, 1000);
        }
    }, [isConnected]);

    return (
        <div className="text-white">
            <button className="w-full bg-blue-500 p-3 rounded-lg mt-4">Add Liquidity</button>
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-sm">Your Liquidity</h3>
                <p className="text-xs mt-2">{liquidityInfo}</p>
            </div>
        </div>
    );
};

export default Pool;

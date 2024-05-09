import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import AddLiquidity from './AddLiquidity';  // Ensure you import the AddLiquidity component

const Pool = () => {
    const { isConnected } = useAccount();
    const [liquidityInfo, setLiquidityInfo] = useState('Connect to a wallet to view your liquidity.');
    const [showAddLiquidity, setShowAddLiquidity] = useState(false);  // State to control display of AddLiquidity component

    useEffect(() => {
        if (isConnected) {
            // Simulate fetching liquidity data
            setTimeout(() => {
                setLiquidityInfo('No liquidity found. Don\'t see a pool you joined? Import it.');
            }, 1000);
        }
    }, [isConnected]);

    const handleAddLiquidityClick = () => {
        setShowAddLiquidity(true);
    };

    return (
        <div className="text-white">
            {!showAddLiquidity && (  // Conditionally render the button only if AddLiquidity is not shown
                <button className="w-full bg-blue-500 p-3 rounded-lg mt-4" onClick={handleAddLiquidityClick}>
                    Add Liquidity
                </button>
            )}
            {!showAddLiquidity ? (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-sm">Your Liquidity</h3>
                    <p className="text-xs mt-2">{liquidityInfo}</p>
                </div>
            ) : (
                <AddLiquidity />
            )}
        </div>
    );
};

export default Pool;
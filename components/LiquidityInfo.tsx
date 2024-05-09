import React from 'react';

interface LiquidityInfoProps {
    token1Symbol: string;
    token2Symbol: string;
    token1PerToken2: string;
    token2PerToken1: string;
    shareOfPool: string;
}

const LiquidityInfo: React.FC<LiquidityInfoProps> = ({ 
    token1Symbol, 
    token2Symbol, 
    token1PerToken2, 
    token2PerToken1, 
    shareOfPool 
}) => {
    return (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg text-sm">
            <div>Initial prices and pool share:</div>
            <div>{token1Symbol} per {token2Symbol}: {token1PerToken2}</div>
            <div>{token2Symbol} per {token1Symbol}: {token2PerToken1}</div>
            <div>Share of Pool: {shareOfPool}</div>
        </div>
    );
};

export default LiquidityInfo;

import React from 'react';
import TokenInput from './TokenInput';
import ActionButton from './ActionButton';

interface Token {
    symbol: string;
    name: string;
    image: string;
}

interface SwapProps {
    payToken: Token;
    receiveToken: Token;
    onPayTokenSelect: (token: Token) => void;
    onReceiveTokenSelect: (token: Token) => void;
    onSwapTokens: () => void;  // Function to swap the tokens
    isConnected: boolean;
}

const Swap = ({
    payToken,
    receiveToken,
    onPayTokenSelect,
    onReceiveTokenSelect,
    onSwapTokens,
    isConnected
}: SwapProps) => {
    return (
        <>
            <TokenInput label="You Pay" token={payToken} onTokenClick={() => onPayTokenSelect(payToken)} />
            <div className="my-2 flex justify-center items-center">
                <button onClick={onSwapTokens} className="bg-transparent text-white p-2 rounded-full inline-flex items-center justify-center">
                    <img src="./swap_arrows.svg" alt="Swap" className="w-6 h-6" />
                </button>
            </div>
            <TokenInput label="You Recieve" token={receiveToken} onTokenClick={() => onReceiveTokenSelect(receiveToken)} />
            <ActionButton isConnected={isConnected} onSwap={() => alert('Swap initiated!')} />
        </>
    );
};

export default Swap;

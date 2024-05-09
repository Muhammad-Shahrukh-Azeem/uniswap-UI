import React, { useState } from 'react';
import TokenInput from './TokenInput';
import ActionButton from './ActionButton';
import { Token } from './types';
import SwapButton from './SwapButton';

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
    const [payAmount, setPayAmount] = useState('');
    const [receiveAmount, setReceiveAmount] = useState('');

    

    const handleSwap = async () => {
        console.log('Swapping tokens');
        console.log('Pay token address:', payToken.address, 'Amount:', payAmount);
        console.log('Receive token address:', receiveToken.address, 'Amount:', receiveAmount);
        // Here you would interact with the smart contract or backend API
    };

    return (
        <>
            <TokenInput label="You Pay" token={payToken} amount={payAmount} onAmountChange={setPayAmount} onTokenClick={() => onPayTokenSelect(payToken)} />
            <div className="my-2 flex justify-center items-center">
            <SwapButton onClick={onSwapTokens} />

            </div>
            <TokenInput label="You Receive" token={receiveToken} amount={receiveAmount} onAmountChange={setReceiveAmount} onTokenClick={() => onReceiveTokenSelect(receiveToken)} />
            <ActionButton isConnected={isConnected} onSwap={handleSwap} />
        </>
    );
};

export default Swap;

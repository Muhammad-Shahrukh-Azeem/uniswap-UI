import React from 'react';
import Image from 'next/image';
import TokenAmountInput from './TokenAmountInput';

interface Token {
    symbol: string;
    name: string;
    image: string;
}

interface TokenInputProps {
    label: string;
    token: Token;
    amount: string;  // Ensure this prop is accepted
    onAmountChange: (amount: string) => void;  // Ensure this prop is accepted
    onTokenClick: () => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ label, token, amount, onAmountChange, onTokenClick }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="flex">
                <TokenAmountInput amount={amount} onAmountChange={onAmountChange} /> {/* Use the TokenAmountInput component */}
                <button onClick={onTokenClick} className="bg-purple-700 px-4 rounded-r-lg flex items-center">
                    <Image src={token.image} alt={token.symbol} width={24} height={24} />
                    <span>{token.symbol} ▼</span>
                </button>
            </div>
        </div>
    );
};

export default TokenInput;
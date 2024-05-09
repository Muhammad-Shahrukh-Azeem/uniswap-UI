import React from 'react';

interface TokenAmountInputProps {
    amount: string;
    onAmountChange: (amount: string) => void;
}

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({ amount, onAmountChange }) => {
    return (
        <input 
            type="number" 
            placeholder="0" 
            className="bg-gray-700 text-white p-2 rounded-l-lg flex-grow focus:outline-none" 
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
        />
    );
};

export default TokenAmountInput;

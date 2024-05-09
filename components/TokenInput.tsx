import React from 'react';
import Image from 'next/image';

interface Token {
    symbol: string;
    name: string;
    image: string;
}
interface TokenInputProps {
    label: string;
    token: Token;
    onTokenClick: () => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ label, token, onTokenClick }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="flex">
                <input type="number" placeholder="0" className="bg-gray-700 text-white p-2 rounded-l-lg flex-grow focus:outline-none" />
                <button onClick={onTokenClick} className="bg-purple-700 px-4 rounded-r-lg flex items-center">
                    <Image src={token.image} alt={token.symbol} width={24} height={24} />
                    <span>{token.symbol} ▼</span>
                </button>
            </div>
        </div>
    );
};

export default TokenInput;
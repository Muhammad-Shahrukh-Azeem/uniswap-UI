import React, { useState } from 'react';
import Image from 'next/image';

interface Token {
    symbol: string;
    name: string;
    image: string;
}

interface TokenSelectModalProps {
    tokens: Token[];
    excludeToken?: Token;
    onSelectToken: (token: Token) => void;
    onClose: () => void;
}

const TokenSelectModal: React.FC<TokenSelectModalProps> = ({ tokens, excludeToken, onSelectToken, onClose }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredTokens = tokens.filter(token =>
        token.symbol !== excludeToken?.symbol &&
        (token.name.toLowerCase().includes(searchTerm.toLowerCase()) || token.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-5 rounded-lg w-1/3">
                <h3 className="text-white text-lg mb-4">Select a token</h3>
                <input
                    type="text"
                    placeholder="Search token"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 rounded text-black"
                />
                <ul className="overflow-y-auto max-h-60">
                    {filteredTokens.map(token => (
                        <li key={token.symbol} className="p-2 hover:bg-gray-700 rounded flex items-center cursor-pointer" onClick={() => onSelectToken(token)}>
                            <Image src={token.image} alt={token.symbol} width={30} height={30} className="mr-2" />
                            <div className="flex flex-col">
                                <span className="font-medium">{token.symbol}</span>
                                <span className="text-sm">{token.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="mt-4 w-full bg-purple-700 text-white py-2 rounded">Close</button>
            </div>
        </div>
    );
};

export default TokenSelectModal;

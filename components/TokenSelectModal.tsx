import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Token } from './types';
import { FaTimes } from 'react-icons/fa'; // Importing close icon from react-icons/fa

interface TokenSelectModalProps {
    tokens: Token[];
    excludeToken?: Token;
    onSelectToken: (token: Token) => void;
    onClose: () => void;
}

const TokenSelectModal: React.FC<TokenSelectModalProps> = ({ tokens, excludeToken, onSelectToken, onClose }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokens);

    useEffect(() => {
        setFilteredTokens(tokens.filter(token =>
            token.symbol !== excludeToken?.symbol &&
            (token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                token.address.toLowerCase().includes(searchTerm.toLowerCase()))));
    }, [tokens, excludeToken, searchTerm]);

    const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".modal-content")) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-5 rounded-lg w-1/3 modal-content">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white text-lg">Select a token</h3>
                    <button onClick={onClose} className="text-white"><FaTimes /></button>
                </div>
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
            </div>
        </div>
    );
};

export default TokenSelectModal;

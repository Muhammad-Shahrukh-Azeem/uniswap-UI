import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Swap from './Swap';
import Pool from './Pool';
import TokenSelectModal from './TokenSelectModal';
import tokens from './assets/tokenList.json';

interface Token {
    symbol: string;
    name: string;
    image: string;
}

const SwapBox = () => {
    const { isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState('swap');
    const [showModal, setShowModal] = useState(false);
    const [activeInput, setActiveInput] = useState<'pay' | 'receive'>('pay');
    const [payToken, setPayToken] = useState<Token>(tokens[0]);
    const [receiveToken, setReceiveToken] = useState<Token>(tokens[1]);

    const toggleModal = (inputType?: 'pay' | 'receive') => {
        if (inputType) setActiveInput(inputType);
        setShowModal(!showModal);
    };

    const swapTokens = () => {
        const temp = payToken;
        setPayToken(receiveToken);
        setReceiveToken(temp);
    };

    const handleTokenSelect = (token: Token) => {
        if (activeInput === 'pay') {
            setPayToken(token);
        } else {
            setReceiveToken(token);
        }
        toggleModal();
    };

    return (
        <div className="bg-gray-800 text-white rounded-lg p-6 w-full md:w-96">
            <div className="flex justify-between text-blue-500 mb-4">
                <button onClick={() => setActiveTab('swap')} className={`flex-1 text-center py-2 rounded-tl-lg ${activeTab === 'swap' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-blue-500'}`}>Swap</button>
                <button onClick={() => setActiveTab('pool')} className={`flex-1 text-center py-2 rounded-tr-lg ${activeTab === 'pool' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-blue-500'}`}>Pool</button>
            </div>
            {activeTab === 'swap' ? (
                <Swap
                    payToken={payToken}
                    receiveToken={receiveToken}
                    onPayTokenSelect={() => toggleModal('pay')}
                    onReceiveTokenSelect={() => toggleModal('receive')}
                    onSwapTokens={swapTokens}
                    isConnected={isConnected}
                />
            ) : (
                <Pool />
            )}
            {showModal && (
                <TokenSelectModal
                    tokens={tokens}
                    excludeToken={activeInput === 'pay' ? receiveToken : payToken}
                    onSelectToken={handleTokenSelect}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default SwapBox;
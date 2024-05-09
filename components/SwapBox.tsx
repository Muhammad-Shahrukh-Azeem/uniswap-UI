import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Swap from './Swap';
import Pool from './Pool';
import TokenSelectModal from './TokenSelectModal';
import tokens from './assets/tokenList.json';
import { Token } from './types';
import TabButton from './TabButton';

const SwapBox = () => {
    const { isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState('swap');
    const [showModal, setShowModal] = useState(false);
    const [activeInput, setActiveInput] = useState<'pay' | 'receive'>('pay');
    const [payToken, setPayToken] = useState<Token>(tokens[0]);
    const [receiveToken, setReceiveToken] = useState<Token>(tokens[1]);
    const [payTokenAddress, setPayTokenAddress] = useState<string>(tokens[0].address);
    const [receiveTokenAddress, setReceiveTokenAddress] = useState<string>(tokens[1].address);

    const toggleModal = (inputType?: 'pay' | 'receive') => {
        if (inputType) setActiveInput(inputType);
        setShowModal(!showModal);
    };

    const swapTokens = () => {
        const tempToken = payToken;
        setPayToken(receiveToken);
        setReceiveToken(tempToken);
        const tempAddress = payTokenAddress;
        setPayTokenAddress(receiveTokenAddress);
        setReceiveTokenAddress(tempAddress);
    };

    const handleTokenSelect = (token: Token) => {
        if (activeInput === 'pay') {
            setPayToken(token);
            setPayTokenAddress(token.address);
        } else {
            setReceiveToken(token);
            setReceiveTokenAddress(token.address);
        }
        toggleModal();
    };

    return (
        <div className="bg-gray-800 text-white rounded-lg p-6 w-full md:w-96">
            <div className="flex justify-between text-blue-500 mb-4">
                <TabButton isActive={activeTab === 'swap'} onClick={() => setActiveTab('swap')} label="Swap" />
                <TabButton isActive={activeTab === 'pool'} onClick={() => setActiveTab('pool')} label="Pool" />
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

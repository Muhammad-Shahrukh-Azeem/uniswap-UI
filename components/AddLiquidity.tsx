import React, { useEffect, useState } from 'react';
import TokenSelectModal from './TokenSelectModal';
import tokens from './assets/tokenList.json';
import { useAccount } from 'wagmi';
import TokenInput from './TokenInput';
import { Token } from './types';
import LiquidityInfo from './LiquidityInfo';


const AddLiquidity = () => {
    const { isConnected } = useAccount();
    const [showModal, setShowModal] = useState(false);
    const [activeInput, setActiveInput] = useState('');
    const [token1, setToken1] = useState<Token>(tokens[0]);
    const [token2, setToken2] = useState<Token>(tokens[1]);
    const [amount1, setAmount1] = useState('');
    const [amount2, setAmount2] = useState('');
    const [token1PerToken2, setToken1PerToken2] = useState('');
    const [token2PerToken1, setToken2PerToken1] = useState('');

    useEffect(() => {
        if (amount1 && amount2) {
            const ratio1 = parseFloat(amount1) / parseFloat(amount2);
            const ratio2 = parseFloat(amount2) / parseFloat(amount1);
            setToken1PerToken2(ratio1.toFixed(4));  // Adjust decimal places as needed
            setToken2PerToken1(ratio2.toFixed(4));  // Adjust decimal places as needed
        }
    }, [amount1, amount2]);

    const toggleModal = (inputType: string) => {
        setActiveInput(inputType);
        setShowModal(true);
    };

    const handleAddLiquidity = () => {
        console.log('Adding liquidity with:', token1.address, token2.address);
        console.log('Amounts:', amount1, amount2);
        console.log('Token1 per Token2:', token1PerToken2);
        console.log('Token2 per Token1:', token2PerToken1);
    };

    const handleTokenSelect = (token: Token) => {
        if (activeInput === 'token1') {
            setToken1(token);
        } else {
            setToken2(token);
        }
        setShowModal(false);
    };

    return (
        <>
            <h2 className="text-xl mb-4">Add Liquidity</h2>
            <TokenInput label="Input" token={token1} amount={amount1} onAmountChange={setAmount1} onTokenClick={() => toggleModal('token1')} />
            <div className="flex justify-center my-2">
                <span className="text-blue-500 text-xl">+</span>
            </div>
            <TokenInput label="Input" token={token2} amount={amount2} onAmountChange={setAmount2} onTokenClick={() => toggleModal('token2')} />
            {isConnected ? (
                <button onClick={handleAddLiquidity} className="w-full bg-blue-500 p-3 rounded-lg mt-4">Add Liquidity</button>
            ) : (
                <button className="w-full bg-blue-500 p-3 rounded-lg mt-4">Connect Wallet</button>
            )}
            <LiquidityInfo 
                token1Symbol={token1.symbol}
                token2Symbol={token2.symbol}
                token1PerToken2={token1PerToken2}
                token2PerToken1={token2PerToken1}
                shareOfPool="100%"
            />
            {showModal && (
                <TokenSelectModal
                    tokens={tokens.filter(t => t.symbol !== (activeInput === 'token1' ? token2.symbol : token1.symbol))}
                    onSelectToken={handleTokenSelect}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default AddLiquidity;
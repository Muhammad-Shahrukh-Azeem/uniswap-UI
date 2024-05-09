import React from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';

interface ActionButtonProps {
    isConnected: boolean;
    onSwap: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ isConnected, onSwap }) => {
    return isConnected ? (
        <button onClick={onSwap} className="w-full bg-purple-600 p-3 rounded-lg mt-4">Swap</button>
    ) : (
        <RainbowConnectButton.Custom>
            {({ openConnectModal }) => (
                <button onClick={openConnectModal} className="w-full bg-purple-600 p-3 rounded-lg mt-4 text-white font-medium">
                    Connect Wallet
                </button>
            )}
        </RainbowConnectButton.Custom>
    );
};

export default ActionButton;

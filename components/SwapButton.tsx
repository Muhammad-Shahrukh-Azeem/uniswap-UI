import React from 'react';
import { MdSwapVert } from 'react-icons/md';

interface SwapButtonProps {
    onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="bg-transparent text-white p-2 rounded-full inline-flex items-center justify-center">
            <MdSwapVert size={24} />
        </button>
    );
};

export default SwapButton;

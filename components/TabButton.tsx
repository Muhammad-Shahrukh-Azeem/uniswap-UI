import React from 'react';

interface TabButtonProps {
    isActive: boolean;
    onClick: () => void;
    label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 text-center py-2 rounded-tl-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-700 text-blue-500'}`}
        >
            {label}
        </button>
    );
};

export default TabButton;

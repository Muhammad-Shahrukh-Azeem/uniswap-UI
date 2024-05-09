import type { NextPage } from 'next';
// import Head from 'next/head';
import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import styles from '../styles/Home.module.css';
import { useAccount } from 'wagmi';
// import { BigNumber, ethers } from 'ethers';
// import getSigner from '../signer/getSigner'
// import { balanceOfAll } from "../Interaction/init"
import SwapBox from '../components/SwapBox';

const Home: NextPage = () => {
    const { address } = useAccount();



    return (
        <div className="min-h-screen text-white flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
                <SwapBox />
            </div>
        </div>
    );

};

export default Home;

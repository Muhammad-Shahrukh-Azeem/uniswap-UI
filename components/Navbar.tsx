import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="bg-white bg-opacity-5 px-4 py-2 flex items-center justify-between shadow-md backdrop-filter backdrop-blur-lg">
            {/* Logo Section */}
            <div className="flex items-center">
                <Image
                    src="https://res.cloudinary.com/zaynfi/image/upload/v1713348305/zaynnet/Zayn-logo_hhjeqt.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    priority
                />
                {/* <span className="ml-4 text-xl font-semibold">Zayn Swap</span> */}
            </div>

            {/* Connect Button Section */}
            <div>
                <ConnectButton />
            </div>
        </nav>
    );
};

export default Navbar;

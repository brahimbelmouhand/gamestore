import Link from "next/link";
import { useEffect, useState } from "react";

const Footer: React.FC = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    useEffect(() => {
        sessionStorage.getItem("loggedInUser");
    }, []);

    return (
        <>
            <footer className="w-full bg-gray-900 shadow-md relative bottom-0 p-7">
                <div className="flex items-center justify-evenly text-white font-semibold mt-2">
                    <div className="flex flex-col">
                        <h2>Links:</h2>
                        <Link href="/">Home</Link>
                        <Link href="/news">News</Link>
                        <Link href="/store">Store</Link>
                        {isAuthenticated &&
                            <Link href="/purchaseHistory">Purchase History</Link>
                        }
                    </div>
                    <div className="flex flex-col">
                        <h2>Extra Links:</h2>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/store">Store</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
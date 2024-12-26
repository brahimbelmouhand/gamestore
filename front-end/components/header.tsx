import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageDropDown from "./ui/LanguageDropDown";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (sessionStorage.getItem("loggedInUser")) {
            setAuthenticated(true)
        }
    }, []);

    return (
        <>
            <header className="bg-gray-800 w-full shadow-md">
                <img src="/image/header/rumbold.png" alt="Rumbold" className="w-full" />
                <nav className="bg-gray-900 flex items-center justify-evenly text-white font-semibold w-full p-2">
                    <Link href="/" className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                        {t("header.home")}
                    </Link>
                    <Link href="/news" className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                        {t("header.news")}
                    </Link>
                    <Link href="/store" className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                        {t("header.store")}
                    </Link>
                    {isAuthenticated &&
                        <Link href='/purchase-history' className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                            {t("header.purchase_history")}
                        </Link>
                    }
                    <LanguageDropDown />
                    {!isAuthenticated &&
                        <Link href='/login' className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                            {t("header.login")}
                        </Link>
                    }
                    {isAuthenticated &&
                        <Link href='/logout' className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                            {t("header.logout")}
                        </Link>
                    }
                </nav>
            </header>
        </>
    );
}
export default Header;

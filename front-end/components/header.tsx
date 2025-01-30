import Link from "next/link";
import LanguageDropDown from "./ui/LanguageDropDown";
import { useTranslation } from "next-i18next";

const Header: React.FC<{ loggedInUser: User | null, handleLogout: () => void }> = ({ loggedInUser, handleLogout }) => {
    const { t } = useTranslation();

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
                    {loggedInUser && loggedInUser.role === "client" &&
                        <Link href='/purchaseHistory' className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                            {t("header.purchase_history")}
                        </Link>
                    }
                    {loggedInUser && loggedInUser.role === "client" &&
                        <Link href='/cart' className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                            {t("header.shoppingCart")}
                        </Link>
                    }
                    {loggedInUser && loggedInUser.role === "admin" &&
                        <Link href="/adminRegister">
                            {t("header.adminRegister")}
                        </Link>
                    }
                    <LanguageDropDown />
                    {!loggedInUser &&
                        <Link href='/login' className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded">
                            {t("header.login")}
                        </Link>
                    }
                    {loggedInUser &&
                        <Link href='/' className="hover:text-gray-300 hover:bg-gray-700 p-4 rounded" onClick={handleLogout}>
                            {t("header.logout")}
                        </Link>
                    }
                </nav>
            </header>
        </>
    );
}
export default Header;

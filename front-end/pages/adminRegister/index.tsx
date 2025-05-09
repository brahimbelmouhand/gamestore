import AdminService from "@/services/AdminService";
import UserService from "@/services/UserService";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import DOMpurify from "dompurify";

const AdminRegister: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<User>({
        firstName: "",
        lastName: "",
        birthDate: new Date(""),
        email: "",
        username: "",
        password: "",
        role: "admin"
    });
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const sanitizedUserInfo = {
            ...userInfo,
            firstName: DOMpurify.sanitize(userInfo.firstName || ""),
            lastName: DOMpurify.sanitize(userInfo.lastName || ""),
            email: DOMpurify.sanitize(userInfo.email || ""),
            username: DOMpurify.sanitize(userInfo.username || "")
        };

        try {
            const response = await AdminService.registerAdmin(sanitizedUserInfo);
            if (response) {
                setSuccessMessage("Created new administrator successfully.");
            } else {
                console.error("Registration failed.");
            }
        } catch (error) {
            console.error("Submit doesn't work: ", error);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const { name, value } = event.target;
            setSuccessMessage(null);
            if (name === "birthDate") {
                const parsedDate = new Date(value);
                setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: parsedDate }));
            }
            else {
                setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
            }
            console.log(userInfo)
        } catch (error) {
            console.log("handlechange doesn't work: ", error);
        }
    }

    return (
        <>
            <main className="min-h-screen flex items-center justify-center">
                <article className="flex flex-col border border-gray-300 shadow-lg rounded-lg p-10 bg-white">
                    <section id="title" className="mb-4">
                        <h1 className="text-2xl text-center font-bold text-gray-800">
                            {t("adminRegister.title")}
                        </h1>
                    </section>
                    <hr className="border-gray-300 my-4" />
                    <section>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <div className="flex flex-row">
                                <div className='flex flex-col mb-6 mx-3'>
                                    <label className='font-semibold font-sans mx-2 mt-2'>{t("register.firstName")}:</label>
                                    <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        type='text'
                                        placeholder={t("register.firstName")}
                                        name="firstName"
                                        onChange={handleChange}
                                        value={userInfo.firstName}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-6 mx-3'>
                                    <label className='font-semibold font-sans mx-2 mt-2'>{t("register.lastName")}:</label>
                                    <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        type="text"
                                        placeholder={t("register.lastName")}
                                        name="lastName"
                                        onChange={handleChange}
                                        value={userInfo.lastName}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col mb-6 mx-3'>
                                <label className='font-semibold font-sans mx-2 mt-2'>{t("register.email")}:</label>
                                <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    type="text"
                                    placeholder={t("register.email")}
                                    name="email"
                                    onChange={handleChange}
                                    value={userInfo.email}
                                    required
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className='flex flex-col mb-6 mx-3'>
                                    <label className='font-semibold font-sans mx-2 mt-2'>{t("register.birthDate")}:</label>
                                    <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        type='date'
                                        placeholder={t("register.birthDate")}
                                        name="birthDate"
                                        onChange={handleChange}
                                        lang={i18n.language}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mb-6 mx-3'>
                                    <label className='font-semibold font-sans mx-2 mt-2'>{t("register.username")}:</label>
                                    <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        type='text'
                                        placeholder={t("register.username")}
                                        name="username"
                                        onChange={handleChange}
                                        value={userInfo.username}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className='flex flex-col mb-6 mx-3'>
                                    <label className='font-semibold font-sans mx-2 mt-2'>{t("register.password")}:</label>
                                    <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        type='password'
                                        placeholder={t("register.password")}
                                        name="password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <input className='border-black text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300  rounded px-2 py-1 text-lg mb-6'
                                type='submit'
                                value={t("adminRegister.title")}
                            />
                            <p>{successMessage}</p>
                        </form>
                    </section>
                </article>
            </main>
        </>
    );
}
export default AdminRegister;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        }
    };
};
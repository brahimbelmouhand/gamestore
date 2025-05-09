import UserService from '@/services/UserService';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DOMpurify from 'dompurify';

const Login: React.FC = () => {
    const [isRememberingPassword, setRememberPassword] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const router = useRouter();
    const { t } = useTranslation();
    const [userInfo, setUserInfo] = useState<User>({
        username: "",
        password: "",
        role: "client"
    });

    /*useEffect(() => {
        const user = localStorage.getItem("loggedInUser")
        if (user) {
            setLoggedInUser(JSON.parse(user));
            setTimeout(() => {
                router.replace('/cart')
            }, 2000);
        }
    }, [loggedInUser, router])*/



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUserInfo((prevData) => ({ ...prevData, [name]: value }))
        console.log(userInfo);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const sanitizedUserInfo = {
            ...userInfo,
            username: DOMpurify.sanitize(userInfo.username || ""),
            password: DOMpurify.sanitize(userInfo.password)
        }
        const response = await UserService.loginUser(sanitizedUserInfo);
        if (response != undefined) {
            if (response.ok) {
                const data = await response.json();
                const { token, username, role } = data;

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify({ username, role, token })
                );

                setTimeout(() => {
                    router.push("/")
                }, 2000);
            }
        }

        const userDataResponse = await UserService.fetchWithToken(process.env.NEXT_PUBLIC_API_URL + "/user/token")
        if (userDataResponse.ok) {
            const userData = await userDataResponse.json();
            console.log("User Data:", userData);
        }
        else {
            console.error("Failed to fetch user data");
        }
    }

    useEffect(() => {
        console.log(isRememberingPassword);
    });

    return (
        <>
            <main className="min-h-screen flex items-center justify-center">
                <article className="flex flex-col border border-gray-300 shadow-lg rounded-lg p-10 bg-white w-1/2">
                    <section id="title" className="mb-4">
                        <h1 className="text-2xl text-center font-bold text-gray-800">
                            {t("login.title")}
                        </h1>
                    </section>
                    <hr className="border-gray-300 my-4" />
                    {!loggedInUser &&
                        <section>
                            <form className='flex flex-col' onSubmit={handleSubmit}>
                                <div className='flex flex-row justify-center mb-6'>
                                    <label className='font-semibold font-sans mx-2 mt-2'>{t("login.username")}:</label>
                                    <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        type='text'
                                        name='username'
                                        placeholder={t("login.username")}
                                        value={userInfo.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-row justify-center mb-6'>
                                    <label className='font-semibold font-sans mx-2 mt-2'>{t("login.password")}:</label>
                                    <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        type='password'
                                        name='password'
                                        placeholder={t("login.password")}
                                        value={userInfo.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <input className='border-black text-white bg-blue-500 hover:bg-blue-600 rounded px-2 py-1 text-lg mb-6'
                                    type='submit'
                                    value={t("login.title")}
                                />
                                <div className='mb-6'>
                                    <input className='mr-2'
                                        type='checkbox'
                                        checked={isRememberingPassword}
                                        onChange={() => setRememberPassword(!isRememberingPassword)}
                                    />
                                    <label>Remember my password</label>
                                </div>
                                <span className='flex justify-center'>
                                    <Link href="register" className=' text-blue-400 hover:underline'>{t("login.register")}</Link>
                                </span>
                            </form>
                        </section>
                    }
                    {loggedInUser &&
                        <section>
                            <p className='text-red-700'> Successfully logged in, redirecting to homepage... </p>
                        </section>
                    }
                </article>
            </main >
        </>
    );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        }
    };
};
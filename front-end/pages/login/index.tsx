import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Login: React.FC = () => {
    const [isRememberingPassword, setRememberPassword] = useState<boolean>(false);
    const { t } = useTranslation();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push('/');
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
                    <section>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <div className='flex flex-row mb-6'>
                                <label className='font-semibold font-sans mr-2'>{t("login.username")}:</label>
                                <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' placeholder={t("login.username")} />
                            </div>
                            <div className='flex flex-row mb-6'>
                                <label className='font-semibold font-sans mr-2'>{t("login.password")}:</label>
                                <input className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type='password' placeholder={t("login.password")} />
                            </div>
                            <input className='border-black text-white bg-blue-500 hover:bg-blue-600 rounded px-2 py-1 text-lg mb-6' type='submit' value={t("login.title")} />
                            <div className='mb-6'>
                                <input className='mr-2' type='checkbox' checked={isRememberingPassword} onChange={() => setRememberPassword(!isRememberingPassword)} />
                                <label>Remember my password</label>
                            </div>
                            <span className='flex justify-center'>
                                <Link href="register" className=' text-blue-400 hover:underline'>No account? Register now!</Link>
                            </span>
                        </form>
                    </section>
                </article>
            </main>
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
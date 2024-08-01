import { useState } from 'react';
import Link from 'next/link';
import Img from './images/teacher1-870x420.jpg';
import Login from '../pages/login';
import { useRouter } from 'next/router';

const Home = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const handleLoginClick = () => {
        setLoginOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <div>
            <div className="flex min-h-[100dvh] flex-col bg-background">
                <header className="w-full py-6 sm:px-6 lg:px-8 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div className='flex justify-row items-center'>
                            <GlobeIcon className="mr-5 w-6 h-6 text-primary-foreground" />
                            <Link href="/" className="text-2xl font-bold text-primary text-black" prefetch={false}>
                                EnglishmanAI
                            </Link>
                        </div>
                        <div>
                            {!isLoggedIn ? (
                                <>
                                    <Link
                                        href="/"
                                        onClick={handleLoginClick}
                                        className="ml-5 bg-black text-white inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    >
                                        Log In
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="ml-5 bg-black text-white inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                    Teach English with Diverse
                                </h1>
                                <p className="mt-4 text-muted-foreground">
                                    Our web platform offers personalized lesson plans and interactive learning tools to help you experience different learning styles from around the world.
                                </p>
                                <div className="mt-6"></div>
                            </div>
                            <div className="hidden lg:block">
                                <img
                                    src={Img.src}
                                    width={600}
                                    height={400}
                                    alt="Hero Image"
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        </div>
                    </section>
                    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="bg-gray-40 rounded-lg bg-card p-6 shadow-xl">
                                <div className="bg-red-500 flex h-12 w-12 items-center justify-center rounded-full text-white">
                                    <BookIcon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-foreground">Online AI Chat</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Our chat-bot will support the talk on the topic of choice, from education to technologies, there are different backgrounds and methods to learn about.
                                </p>
                            </div>
                            <div className="bg-gray-40 rounded-lg bg-card p-6 shadow-xl">
                                <div className="bg-red-500 flex h-12 w-12 items-center justify-center rounded-full text-white">
                                    <VideoIcon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-foreground">Methodics Database</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Our database system feature engaging different professors from the globe will serve as an example to keep you motivated and keen on creativity.
                                </p>
                            </div>
                            <div className="bg-gray-40 rounded-lg bg-card p-6 shadow-xl">
                                <div className="bg-red-500 flex h-12 w-12 items-center justify-center rounded-full text-white">
                                    <UserIcon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-foreground">Plan Generator</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Our system can do all the previous tasks by itself. It will read the materials from the web, search existing database and create a lesson plan.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="bg-gray-100 py-6">
                    <div className="container mx-auto px-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
                        &copy; 2024 EnglishmanAI. All rights reserved.
                    </div>
                </footer>
            </div>
            <Login isOpen={isLoginOpen} setOpen={setLoginOpen} />
        </div>
    )
};

export default Home;

//@ts-ignore
function GlobeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    )
}

//@ts-ignore
function BookIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    )
}

//@ts-ignore
function UserIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

//@ts-ignore
function VideoIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
        </svg>
    )
}

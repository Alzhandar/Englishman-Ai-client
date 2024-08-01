import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {Finalfooter} from './finalfooter'
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Topics = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                let token = localStorage.getItem('token');

                // Получение токена из URL, если он присутствует
                const urlParams = new URLSearchParams(window.location.search);
                const tokenFromUrl = urlParams.get('token');

                if (tokenFromUrl) {
                    token = tokenFromUrl;
                    localStorage.setItem('token', token);
                }

                if (!token) {
                    console.error('No token found');
                    return;
                }

                const res = await axios.get('http://englishmanai-server-temp-production.up.railway.app/api/topics', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setTopics(res.data);
            } catch (err) {
                console.error('Error fetching topics:', err);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div>
            <div className="flex flex-col min-h-[100dvh]">
                <header className="w-full py-6 sm:px-6 lg:px-8 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div className='flex justify-row items-center'>
                            <GlobeIcon className="mr-5 w-6 h-6 text-primary-foreground" />
                            <Link href="/" className="text-2xl font-bold text-primary text-black" prefetch={false}>
                                EnglishmanAI
                            </Link>
                        </div>
                        <div>
                        <Link href="/files">
            <Button className="bg-red-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-gray-800">
                Database
            </Button>
        </Link>
                            <Link
                                href="/"
                                className="ml-5 bg-black text-white inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                </header>
                <main className="ml-10 flex-1 py-8">
                    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {topics.map((topic: any) => (
                            <li key={topic.id} className="text-lg">
                                <Link href={`/topics/${topic.id}`}>
                                    <Card className='bg-gray-40 shadow-xl'>
                                        <CardContent className="flex flex-col items-center justify-center aspect-square p-6">
                                            <div className="bg-red-500 flex h-12 w-12 items-center justify-center rounded-full text-white">
                                                <BeakerIcon className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                            <h1 className='mt-3 font-bold'>{topic.name}</h1>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </li>
                        ))}
                    </div>
                </main>
                <Finalfooter/>
            </div>
        </div>
    );
};

// @ts-ignore
function BeakerIcon(props) {
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
            <path d="M4.5 3h15" />
            <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
            <path d="M6 14h12" />
        </svg>
    )
}

// @ts-ignore
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

export default Topics;

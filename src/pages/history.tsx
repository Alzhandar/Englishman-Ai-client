import { useEffect, useState } from 'react';
import api from '../services/api';
import { jsPDF } from 'jspdf';
import { Card } from '../components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Chat {
    question: string;
    answer: string;
}

const History = () => {
    const [chatHistory, setChatHistory] = useState<Chat[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get('http://localhost:5001/api/ai/history', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setChatHistory(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchChatHistory();
    }, []);

    const downloadPDF = () => {
        const doc = new jsPDF();
        let y = 10; 
        doc.setFontSize(12);
        
        chatHistory.forEach((chat, index) => {
            doc.text(`Question ${index + 1}: ${chat.question}`, 10, y);
            y += 10;
            doc.text(`Answer ${index + 1}: ${chat.answer}`, 10, y);
            y += 20;
        });

        doc.save('chat_history.pdf');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <header className="w-full py-6 sm:px-6 lg:px-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <div className='flex justify-row items-center'>
                        <GlobeIcon className="mr-5 w-6 h-6 text-primary-foreground" /> 
                        <Link href="/" className="text-2xl font-bold text-primary text-black" prefetch={false}>
                            EnglishmanAI
                        </Link>
                    </div>
                    <div>    
                        <button
                            onClick={downloadPDF} 
                            className="ml-5 bg-red-500 text-white inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Download as PDF
                        </button>
                        <Link
                            href="/"
                            onClick={handleLogout}
                            className="ml-5 bg-black text-white inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Log Out
                        </Link>
                    </div>          
                </div>
            </header>
            <ul className="mt-10 space-y-4">
                {chatHistory.map((chat, index) => (
                    <li key={index} className="text-lg">
                        <Card className="p-4 bg-card text-card-foreground shadow-m">
                            <div className="grid gap-2">
                                <div className="font-medium">{chat.question}</div>
                                <div>{chat.answer}</div>
                            </div>
                        </Card>
                    </li>
                ))}
            </ul>
            <footer className="w-full bg-gray-100 py-6">
                <div className="container mx-auto px-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
                    &copy; 2024 EnglishmanAI. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

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

export default History;

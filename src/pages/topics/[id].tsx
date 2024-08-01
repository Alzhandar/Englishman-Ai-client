import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import Link from 'next/link';
import Loading from '../loading';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Menu } from '@headlessui/react';

interface Topic {
    id: number;
    name: string;
}

interface ChatMessage {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
}

const TopicDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [topic, setTopic] = useState<Topic | null>(null);
    const [question, setQuestion] = useState('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showKTPForm, setShowKTPForm] = useState<boolean>(false);
    const [ktpSubtopic, setKtpSubtopic] = useState('');
    const [session1Start, setSession1Start] = useState('');
    const [session1End, setSession1End] = useState('');
    const [session2Start, setSession2Start] = useState('');
    const [session2End, setSession2End] = useState('');
    const [addToCalendar, setAddToCalendar] = useState(false); // New state for checkbox

    useEffect(() => {
        if (id) {
            const fetchTopicDetails = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`http://englishmanai-server-temp-production.up.railway.app/api/topics/${id}`, {
                        headers: {
                            'x-auth-token': token
                        }
                    });
                    setTopic(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchTopicDetails();
        }
    }, [id]);

    const handleChat = async () => {
        if (!question.trim()) return;

        const userMessage: ChatMessage = {
            id: chatMessages.length,
            sender: 'user',
            text: question,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages([...chatMessages, userMessage]);
        setQuestion('');

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://englishmanai-server-temp-production.up.railway.app/api/ai/chat', { question }, {
                headers: {
                    'x-auth-token': token
                }
            });

            const aiMessage: ChatMessage = {
                id: chatMessages.length + 1,
                sender: 'ai',
                text: res.data.answer,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setChatMessages([...chatMessages, userMessage, aiMessage]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateKTP = async () => {
        setError(null);
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://englishmanai-server-temp-production.up.railway.app/api/ktp/create', { 
                topic: topic?.name,
                subtopic: ktpSubtopic,
                session1Start,
                session1End,
                session2Start,
                session2End,
                addToCalendar // Include the checkbox state in the request
            }, {
                headers: {
                    'x-auth-token': token
                },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `KTP_${ktpSubtopic}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.status === 400) {
                setError('Failed to create KTP. Please try again.');
            } else {
                setError('Failed to create KTP.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    if (loading) {
        return <Loading />;
    }

    if (!topic) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="w-full py-6 sm:px-6 lg:px-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <div className='flex justify-row items-center'>
                        <GlobeIcon className="mr-5 w-6 h-6 text-primary-foreground" /> 
                        <Link href="/" className="text-2xl font-bold text-primary text-black" 
                        prefetch={false}>
                        EnglishmanAI
                    </Link>
                </div>
                <div>
                    <Link href="/topics" className="text-2xl font-bold text-primary text-red-500" prefetch={false}>
                        {topic.name}
                    </Link>
                </div>
                <div className="relative inline-block text-left">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="ml-5 bg-red-500 text-white inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                Menu
                            </Menu.Button>
                        </div>

                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setShowKTPForm(!showKTPForm)}
                                            className={`${
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block px-4 py-2 text-sm`}
                                        >
                                            Lesson Generator
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href="/history"
                                            className={`${
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block px-4 py-2 text-sm`}
                                        >
                                            History
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href="/"
                                            onClick={handleLogout}
                                            className={`${
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block px-4 py-2 text-sm`}
                                        >
                                            Log Out
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Menu>
                </div>        
            </div>
        </header>
        <div className="flex-1 overflow-auto">
            <div className="py-8 px-6 space-y-6">
                {chatMessages.map((message) => (
                    message.sender === 'user' ? (
                        <div key={message.id} className="flex items-end justify-end gap-4">
                            <div className="flex flex-col items-end">
                                <div className="bg-black text-white rounded-lg p-3 max-w-xs shadow-md">
                                    <div className="font-semibold">User</div>
                                    <div className="border-t border-gray-300 my-1"></div>
                                    <div>{message.text}</div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
                            </div>
                            <Avatar className="w-10 h-10 border border-gray-300">
                                <UserIcon className="w-full h-full" />
                            </Avatar>
                        </div>
                    ) : (
                        <div key={message.id} className="flex items-end justify-start gap-4">
                            <Avatar className="w-10 h-10 border border-gray-300">
                                <TeacherIcon className="w-full h-full" />
                            </Avatar>
                            <div className="flex flex-col items-start">
                                <div className="bg-red-500 text-white rounded-lg p-3 max-w-xs shadow-md">
                                    <div className="font-semibold">AI Phd</div>
                                    <div className="border-t border-gray-300 my-1"></div>
                                    <div>{message.text}</div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
                            </div>
                        </div>
                    )
                ))}
                {error && <div className="text-red-500">{error}</div>}
            </div>
        </div>
        <div className="bg-background border-t px-6 py-4">
            <div className="relative">
                <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="pr-16 min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm"
                />
                <Button onClick={handleChat} type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
                    <SendIcon>
                        <span className="sr-only">Send</span>
                    </SendIcon>
                </Button>
            </div>
        </div>
        {showKTPForm && (
            <div>
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <Card className="w-full max-w-md shadow-xl">
                        <CardHeader>
                            <CardTitle className='flex justify-center text-white'>Lesson Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="ktpSubtopic" className=' text-white'>Subtopic</Label>
                                <Textarea id="ktpSubtopic" value={ktpSubtopic} onChange={(e) => setKtpSubtopic(e.target.value)} rows={2} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="session1Start" className=' text-white'>Session 1 Start</Label>
                                    <input
                                        type="datetime-local"
                                        id="session1Start"
                                        value={session1Start}
                                        onChange={(e) => setSession1Start(e.target.value)}
                                        className="mt-1 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="session1End" className=' text-white'>Session 1 End</Label>
                                    <input
                                        type="datetime-local"
                                        id="session1End"
                                        value={session1End}
                                        onChange={(e) => setSession1End(e.target.value)}
                                        className="mt-1 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="session2Start" className=' text-white'>
                                        Session 2 Start
                                        <input
                                            type="datetime-local"
                                            id="session2Start"
                                            value={session2Start}
                                            onChange={(e) => setSession2Start(e.target.value)}
                                            className="text-black mt-1 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </Label>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="session2End" className=' text-white'>
                                        Session 2 End
                                        <input
                                            type="datetime-local"
                                            id="session2End"
                                            value={session2End}
                                            onChange={(e) => setSession2End(e.target.value)}
                                            className="text-black mt-1 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </Label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="addToCalendar" className="text-white">
                                    <input
                                        type="checkbox"
                                        id="addToCalendar"
                                        checked={addToCalendar}
                                        onChange={(e) => setAddToCalendar(e.target.checked)}
                                        className="mr-2"
                                    />
                                    Add to Google Calendar
                                </Label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button onClick={() => setShowKTPForm(false)} className="w-full bg-gray-500 text-white py-2 rounded-md mr-2">
                                Back
                            </Button>
                            <Button onClick={handleCreateKTP} className="w-full bg-red-500 text-white py-2 rounded-md ml-2">
                                Generate Lesson Plan
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )}
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

//@ts-ignore
function SendIcon(props) {
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
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
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
            <path d="M20.6 20.6c-.9-2.9-3.5-5-6.6-5h-4c-3.1 0-5.7 2.1-6.6 5" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

//@ts-ignore
function TeacherIcon(props) {
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
            <path d="M20.6 20.6c-.9-2.9-3.5-5-6.6-5h-4c-3.1 0-5.7 2.1-6.6 5" />
            <circle cx="12" cy="7" r="4" />
            <path d="M16 14v6" />
            <path d="M20 14v6" />
            <path d="M18 14v2" />
        </svg>
    )
}

export default TopicDetails;

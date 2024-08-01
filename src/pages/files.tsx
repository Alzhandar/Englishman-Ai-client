import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Finalfooter } from './finalfooter';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Document, Page, pdfjs } from 'react-pdf';
import Modal from '../components/ui/modal';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Files = () => {
    const [files, setFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                let token = localStorage.getItem('token');

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

                const res = await axios.get('http://englishmanai-server-temp-production.up.railway.app/api/files', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setFiles(res.data.files);
            } catch (err) {
                console.error('Error fetching files:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    const handleDownload = async (fileName: string) => {
        try {
            let token = localStorage.getItem('token');
            const res = await axios.get(`http://englishmanai-server-temp-production.up.railway.app/api/files/${fileName}`, {
                headers: {
                    'x-auth-token': token
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Error downloading file:', err);
        }
    };

    const handleView = (fileName: string) => {
        setSelectedFile(fileName);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedFile(null);
    };

    return (
        <div className="flex flex-col min-h-[100dvh] bg-gray-100">
            <header className="w-full py-6 sm:px-6 lg:px-8 shadow-xl bg-white">
                <div className="flex items-center justify-between container mx-auto">
                    <div className="flex items-center">
                        <GlobeIcon className="mr-5 w-6 h-6 text-primary-foreground" />
                        <Link href="/" className="text-2xl font-bold text-primary text-black" prefetch={false}>
                            EnglishmanAI
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/topics">
                        <Button className="bg-red-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-gray-800">
                            Topics
                        </Button>
                        </Link>
                        <Button
                            className="bg-black text-white px-4 py-2 rounded-md transition-colors hover:bg-gray-800"
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/';
                            }}
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p>Loading files...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {files.map((file, index) => (
                            <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                <CardHeader className="p-4 border-b border-gray-200">
                                    <CardTitle className="text-lg font-semibold text-gray-800">{file}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <p className="text-sm text-gray-600">Click below to view or download the file.</p>
                                </CardContent>
                                <CardFooter className="p-4 border-t border-gray-200 flex space-x-4">
                                    <Button onClick={() => handleView(file)} className="bg-black text-white px-4 py-2 rounded-md">
                                        View
                                    </Button>
                                    <Button onClick={() => handleDownload(file)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
            <Finalfooter />
            {showModal && selectedFile && (
                <Modal open={showModal} onClose={closeModal}>
                    <div className="w-full h-full">
                        <Document
                            file={`http://localhost:5001/api/files/${selectedFile}`}
                            onLoadError={console.error}
                        >
                            <Page pageNumber={1} />
                        </Document>
                    </div>
                </Modal>
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
    );
}

export default Files;

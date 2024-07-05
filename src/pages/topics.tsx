import { useEffect, useState } from 'react';
import api from '../services/api';
import Link from 'next/link';
import { Card, CardContent } from "../components/ui/card"
import { useRouter } from 'next/router';

const Topics = () => {

  const router = useRouter();

  const iconMapping = {
    "Fashion and Clothing": FashionIcon,
    "Education": EducationIcon,
    "Environment": EnvironmentIcon,
    "Technology": TechnologyIcon,
    "Family": FamilyIcon,
  };  

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/topics', {
          headers: {
            'x-auth-token': token
          }
        });
        setTopics(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopics();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div>
      <div className="flex flex-col min-h-[100dvh]">
        <header className="w-full py-6 sm:px-6 lg:px-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div className='flex justify-row items-center'>
              <GlobeIcon className="mr-5 w-6 h-6 text-primary-foreground" /> 
              <Link href="/" className="text-2xl font-bold text-primary text-black" prefetch={false}>
                Englishman AWT
              </Link>
            </div>
            <div>    
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
        <main className="flex-1 py-8 flex items-center justify-center">
          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topics.map((topic: any) => {
              //@ts-ignore
              const IconComponent = iconMapping[topic.name] || BeakerIcon; // Default icon if not mapped
              return (
                <li key={topic.id} className="text-lg">
                  <Link href={`/topics/${topic.id}`}>
                    <Card className='bg-gray-40 shadow-xl'>
                      <CardContent className="flex flex-col items-center justify-center aspect-square p-6">
                        <div className="bg-red-500 flex h-12 w-12 items-center justify-center rounded-full text-white">
                          <IconComponent className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h1 className='mt-3 font-bold'>{topic.name}</h1>
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </div>
        </main>
        <footer className="bg-gray-100 py-6">
          <div className="container mx-auto px-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
            &copy; 2024 Englishman AWT. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

//@ts-ignore
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
function FashionIcon(props) {
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
      <path d="M4 3h16l-2 14H6L4 3z" />
      <path d="M9 3l2 10m2-10l2 10m-5 4v4m2-4v4" />
    </svg>
  );
}

//@ts-ignore
function EducationIcon(props) {
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
      <path d="M4 12l8-5 8 5-8 5-8-5z" />
      <path d="M12 22V7" />
      <path d="M4 18v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

//@ts-ignore
function EnvironmentIcon(props) {
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

//@ts-ignore
function TechnologyIcon(props) {
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
      <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
      <path d="M16 2v4h-4" />
      <path d="M8 22v-4h4" />
      <path d="M22 16h-4v4" />
      <path d="M2 8h4v4" />
    </svg>
  );
}

//@ts-ignore
function FamilyIcon(props) {
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
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M12 19v2" />
    </svg>
  );
}


export default Topics;

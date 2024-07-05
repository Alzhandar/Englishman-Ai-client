import { useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';
import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

//@ts-ignore
const Login = ({ isOpen, setOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    //@ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            router.push('/topics');
            setOpen(false);
        } catch (err) {
            console.error(err);
            alert('Error logging in');
        }
    };

    const handleX = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
                <button onClick={handleX} style={{ display: 'none' }}>Open Modal</button>
                <DialogContent className="sm:max-w-[400px]">
                    <div className="flex flex-col gap-6 p-6">
                        <div className="space-y-2 text-left">
                            <h2 className="text-white text-2xl font-bold">Login</h2>
                            <p className="text-white text-muted-foreground">Enter your credentials to access your account.</p>
                        </div>
                        <div className="w-full space-y-4">
                            <div className="grid grid-cols-1 gap-2 text-white">
                                <Label htmlFor="email" className='text-white'>Email</Label>
                                <Input className='text-black' value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email" />
                            </div>
                            <div className="grid grid-cols-1 gap-2 text-white">
                                <Label htmlFor="password" className='text-white'>Password</Label>
                                <Input className='text-black' value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password" />
                                <Button onClick={handleSubmit} className="bg-red-500 text-white w-full">Sign In</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Login;

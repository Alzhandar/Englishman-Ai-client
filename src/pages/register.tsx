// components/Register.js
import { useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import axios from 'axios';

//@ts-ignore
const Register = ({ isOpen, setOpen, setOpenLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    //@ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting data:', { email, password, confirmPassword });
        if (password !== confirmPassword) {
            return alert('Passwords do not match');
        }
        try {
            const res = await axios.post('https://englishmanawt.onrender.com/api/auth/register', { email, password, confirmPassword });
            localStorage.setItem('token', res.data.token);
            router.push('/');
            setOpen(false); // Close register modal
            setOpenLogin(true); // Open login modal
        } catch (err) {
            console.error('Error during registration:', err);
            alert('Error registering user');
        }
    };

    const handleX = () => {
        setOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
            <DialogTrigger asChild>
                <button onClick={handleX} style={{ display: 'none' }}>Open Modal</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">Register</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-white">Create a new account to get started.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-2 text-white">
                        <Label htmlFor="email">Email</Label>
                        <Input className='text-black' value={email} onChange={(e) => setEmail(e.target.value)} required id="email" type="email" />
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-white">
                        <Label htmlFor="password">Password</Label>
                        <Input className='text-black' value={password} onChange={(e) => setPassword(e.target.value)} required id="password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-white">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input className='text-black' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required id="confirm-password" type="password" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} type="submit" className="w-full text-white bg-red-500">
                        Register
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Register;

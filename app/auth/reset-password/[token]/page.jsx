'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Eye, EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Navbar from '@/app/navbar';
import DOMPurify from 'dompurify';

const FloatingInput = ({ label, type = 'text', id, value, onChange, required = false, status = '' }) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordType = type === 'password';

    return (
        <div className="relative">
            <Input
                isRequired={required}
                label={label}
                size="lg"
                type={isPasswordType && isPasswordVisible ? 'text' : type}
                variant="faded"
                value={value}
                onValueChange={onChange}
                id={id}
                classNames={{
                    inputWrapper:
                        status === 'match'
                            ? 'border border-green-500'
                            : status === 'mismatch'
                                ? 'border border-red-500'
                                : '',
                }}
            />
            {isPasswordType && (
                <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                    {isPasswordVisible ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
                </div>
            )}
        </div >
    );
};

const ResetPassword = () => {
    const router = useRouter();
    const params = useParams();
    const token = params?.token;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showSection, setShowSection] = useState('reset-password');

    const passwordMatchStatus =
        confirmPassword.length > 0
            ? password === confirmPassword
                ? 'match'
                : 'mismatch'
            : '';


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: password }),
            });

            const data = await res.json();
            setMessage(data.message || 'Something went wrong');

            if (res.ok) {
                setShowSection('reset-password-success');
            }
        } catch (error) {
            setMessage('Network error');
        }
    };

    useEffect(() => {
        if (showSection === 'reset-password-success') {
            const timer = setTimeout(() => router.push('/auth/login'), 2000);
            return () => clearTimeout(timer);
        }
    }, [showSection, router]);

    return (
        <>
            <nav id="navbar" className="fixed top-0 z-10 w-full py-5 bg-white px-4 ">
                <div className="container mx-auto flex justify-between">
                    <div className="flex lg:ml-72 items-center justify-center w-full lg:w-auto">
                        <Link href="/">
                            <h1 className="tracking-normal">FourOf</h1>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                {showSection === 'reset-password' && (
                    <div className="w-full max-w-sm space-y-5 mx-auto flex-grow flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-6 md:mb-8">
                            Reset Password
                        </h2>
                        <p className='text-center'>Enter new password.</p>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            {message && (
                                <div className="text-red-500 text-sm md:text-base text-center p-3 rounded-lg bg-red-50">{message}</div>
                            )}
                            <FloatingInput
                                label="New Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={setPassword}
                                required
                            />
                            <FloatingInput
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                required
                                status={passwordMatchStatus}
                            />
                            {confirmPassword && (
                                <p className={`text-sm ${passwordMatchStatus === 'match' ? 'text-green-500' : 'text-red-500'}`}>
                                    {passwordMatchStatus === 'match'
                                        ? 'Passwords match'
                                        : 'Passwords do not match'}
                                </p>
                            )}
                            <Button
                                size="lg"
                                type="submit"
                                className="w-full bg-violet-600"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </div>
                )}

                {showSection === 'reset-password-success' && (
                    <div className="w-full max-w-sm mx-auto flex-grow flex flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center">
                            Password Reset Successful!
                        </h1>
                        <p className="text-center mt-4">
                            Your password has been updated successfully. Redirecting to login...
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ResetPassword;
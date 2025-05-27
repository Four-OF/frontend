"use client";
import React, { useRef, useState, useEffect } from 'react';
import { CaretLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

const FloatingInput = ({ label, type = 'text', id, value, onChange }) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);

    // Update hasContent state based on initial value
    useEffect(() => {
        setHasContent(value !== '');
    }, [value]);


    // Determine if the label should be floating based on focus or content
    const isFloating = isFocused || hasContent;

    return (
        <Input
            isRequired
            label={label}
            size="lg"
            type={type}
            variant="faded"
            value={value} // Bind the value prop to make the input controlled
            onValueChange={onChange} // Use onValueChange to handle input changes
        // endContent={endContent} // Pass endContent for password visibility toggle
        />
    );
};

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        // confirmPassword: ''
    });

    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Example: If you want to check for empty fields
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return;
        }
        setError(''); // Clear any previous error

        try {
            // Send POST request to login API endpoint with form data as JSON
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // IMPORTANT: allow cookies to be included
                body: JSON.stringify(formData),
            });
            console.log('Response:', response);

            // If the response is not OK, show error from API or a default message
            if (response.status === 200) {
                router.push('/class');
            } else if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Login failed');
                return;
            }

            // Optionally redirect or show a success message here
            // router.push('/dashboard');
            console.log('Login successful');
        } catch (err) {
            // Handle network or unexpected errors
            setError('An error occurred. Please try again.');
        }
    };

    // Handler for input changes
    const handleInputChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

            <button
                className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => history.back()}
            >
                <CaretLeft size={28} />
            </button>
            <div className="w-full max-w-sm space-y-5 mx-auto flex-grow flex flex-col justify-center"> 
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-6 md:mb-8">
                    Log in
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {error && (
                        <div className="text-red-500 text-sm md:text-base text-center p-3 rounded-lg bg-red-50">{error}</div>
                    )}
                    <FloatingInput
                        label="Email"
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                    />
                    <FloatingInput
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                    />
                    <Button size="lg" type="submit" className="w-full bg-violet-600">
                        Log in
                    </Button>
                </form>
                <div className="flex flex-col  items-center justify-between mt-4 gap-4">
                    <p>or</p>
                    <div className="flex flex-row w-full gap-4">
                        <Button size="lg" type="submit" className="w-full bg-violet-600">
                            Log in
                        </Button>
                        <Button size="lg" type="submit" className="w-full bg-violet-600">
                            Log in
                        </Button>
                    </div>
                </div>

                <div className="mt-6 md:mt-8 text-center space-y-3 md:space-y-4">
                    <p className="text-sm md:text-base text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 underline">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                        By creating an account, you agree to our{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                            Terms
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

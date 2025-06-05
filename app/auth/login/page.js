"use client";
import React, { useRef, useState, useEffect } from 'react';
import { CaretLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import DOMPurify from 'dompurify';

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


    // XSS Protection: Sanitize all user inputs and error messages
    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sanitize inputs before processing
        // const cleanEmail = sanitizeInput(formData.email);
        // const cleanPassword = sanitizeInput(formData.password);

        // Example: If you want to check for empty fields
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,24}$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Password validation
        const passwordRegex = /^\S{8,64}$/;
        if (!passwordRegex.test(formData.password)) {
            setError('Password must be 8-64 characters with no spaces');
            setIsLoading(false);
            return;
        }

        setError(''); // Clear any previous error

        try {
            // Send POST request to login API endpoint with form data as JSON
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest' // Optional: Indicate this is an AJAX request
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
                    <Button
                        size="lg"
                        type="submit"
                        className="w-full bg-violet-600">
                        Log in
                    </Button>
                </form>
                <div className="flex flex-col  items-center justify-between mt-4 gap-4">
                    <p>or</p>
                    <div className="flex flex-row w-full gap-4">
                        <Button size="lg" type="button" className="w-full bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-600"
                            onPress={() => handleOAuthLogin('google')}
                        >
                            <div className="flex items-center gap-2">
                                {/* Google SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    className="w-5 h-5 text-violet-600"
                                    aria-hidden="true"
                                >
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                </svg>
                                <span>Google</span>
                            </div>
                        </Button>

                        {/* <Button size="lg" type="button" className="w-full bg-violet-700 hover:bg-violet-600 text-white"
                            onClick={() => handleOAuthLogin('facebook')}>
                            <div className="flex items-center gap-2">
                                //Facebook SVG
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    className="w-5 h-5 text-white"
                                    aria-hidden="true"
                                >
                                    <path fill="currentColor" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708V30.938h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.979 48 24z" />
                                </svg>
                                <span>Facebook</span>
                            </div>
                        </Button> */}
                    </div>
                </div>

                <div className="mt-6 md:mt-8 text-center space-y-3 md:space-y-4">
                    <p className="text-sm md:text-base text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/languages" className="text-blue-600 hover:text-blue-700 underline">
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

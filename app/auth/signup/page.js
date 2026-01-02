'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { CaretLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import DOMPurify from 'dompurify';

export const EyeSlashFilledIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                fill="currentColor"
            />
            <path
                d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                fill="currentColor"
            />
            <path
                d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                fill="currentColor"
            />
            <path
                d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                fill="currentColor"
            />
            <path
                d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const EyeFilledIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                fill="currentColor"
            />
            <path
                d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
                fill="currentColor"
            />
        </svg>
    );
};

const FloatingInput = ({ label, type, id, value, onChange, endContent }) => {
    return (
        <Input
            isRequired
            label={label}
            size="lg"
            type={type}
            variant="faded"
            value={value}
            onValueChange={onChange}
            endContent={endContent}
        />
    );
};

// Separate component that uses useSearchParams
const SignupForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const cleanQueryParam = (value) => {
        return DOMPurify.sanitize(value?.trim() || "");
    };
    // Extract query parameters
    const language = cleanQueryParam(searchParams.get("language"));
    const page1Answer = cleanQueryParam(searchParams.get("page1Answer"));
    const page2Answer = cleanQueryParam(searchParams.get("page2Answer"));
    const page3Answer = cleanQueryParam(searchParams.get("page3Answer"));

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validate signup form data
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
            setError("Name, email, and password are required");
            setIsLoading(false);
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const nameRegex = /^[a-z ,.'-]+$/i;
        // Validate name format
        if (!formData.name || !nameRegex.test(sanitizeInput(formData.name))) {
            setError("Please enter a valid name");
            setIsLoading(false);
            return;
        }

        // Validate email format
        if (!formData.email || !emailRegex.test(sanitizeInput(formData.email))) {
            setError("Please enter a valid email address");
            setIsLoading(false);
            return;
        }


        // Validate password
        const passwordRegex = /^\S{8,64}$/;
        if (!formData.password || !passwordRegex.test(sanitizeInput(formData.password))) {
            setError("Password must be at least 8 characters long with no spaces");
            setIsLoading(false);
            return;
        }

        if (!formData.password.trim()) {
            setError("Password is required");
            setIsLoading(false);
            return;
        }


        // if (formData.password.length < 8) {
        //     setError("Password must be at least 6 characters long");
        //     setIsLoading(false);
        //     return;
        // }

        // Validate survey data
        if (!language || !page1Answer || !page2Answer || !page3Answer) {
            setError("Survey data is incomplete");
            setIsLoading(false);
            return;
        }

        try {
            // Submit signup data
            const signupResponse = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (!signupResponse.ok) {
                const data = await signupResponse.json();
                throw new Error(data.message || "Signup failed");
            }

            // Prepare survey data
            const selections = {
                language: language,
                page1: {
                    suvQuestion: `Why are you learning ${language}?`,
                    suvAnswer: page1Answer,
                },
                page2: {
                    suvQuestion: `How much ${language} do you know?`,
                    suvAnswer: page2Answer,
                },
                page3: {
                    suvQuestion: "How did you hear about us?",
                    suvAnswer: page3Answer,
                },
            };
            // Submit survey data
            const surveyResponse = await fetch("http://localhost:8080/survey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(selections),
            });

            if (!surveyResponse.ok) {
                throw new Error("Failed to submit survey data");
            }

            // const surveyResult = await surveyResponse.json();
            // console.log("API Response (Survey):", surveyResult);

            // Redirect to class page after both operations succeed
            router.push("/class");

        } catch (err) {
            setError(err.message || "An error occurred. Please try again.");
            console.error("Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const sanitizeInput = (value) => {
        return DOMPurify.sanitize(value.trim());
    };
    const handleInputChange = (field) => (value) => {
        setFormData({ ...formData, [field]: sanitizeInput(value) });
    };

    const toggleVisibility = () => setIsVisible(!isVisible);

    const API_URL = 'http://localhost:8080';

    const handleOAuthLogin = (provider) => {
        console.log(`Logging in with ${provider}...`);
        // Include survey data in OAuth redirect
        const queryParams = new URLSearchParams({
            language: language || '',
            page1Answer: page1Answer || '',
            page2Answer: page2Answer || '',
            page3Answer: page3Answer || '',
        });
        window.location.href = `${API_URL}/auth/${provider}?${queryParams.toString()}`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <button
                className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => router.back()}
                disabled={isLoading}
            >
                <CaretLeft size={28} />
            </button>

            {/* Main content container (Title and Form) - centered */}
            <div className="w-full max-w-sm space-y-5 mx-auto flex-grow flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-6 md:mb-8">
                    Create your profile
                </h1>

                {/* Form with responsive spacing */}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {error && (
                        <div className="text-red-500 text-sm md:text-base text-center p-3 rounded-lg bg-red-50 border border-red-200">
                            {error}
                        </div>
                    )}

                    <FloatingInput
                        label="Name"
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                    />

                    <FloatingInput
                        label="Email"
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                    />

                    <FloatingInput
                        label="Password"
                        endContent={
                            <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange("password")}
                    />

                    <Button
                        size="lg"
                        type="submit"
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>

                <div className="flex flex-col items-center justify-between mt-4 gap-4">
                    <p className="text-gray-500">or</p>
                    <div className="flex flex-row w-full gap-4">
                        <Button
                            size="lg"
                            type="button"
                            className="w-full bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-600"
                            onPress={() => handleOAuthLogin('google')}
                            disabled={isLoading}
                        >
                            <div className="flex items-center gap-2">
                                {/* Google SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    className="w-5 h-5"
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

                        {/* <Button
                            size="lg"
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            onPress={() => handleOAuthLogin('facebook')}
                            disabled={isLoading}
                        >
                            <div className="flex items-center gap-2">
                                // Facebook SVG
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

                {/* Footer Links - Responsive text sizing and spacing */}
                <div className="mt-6 md:mt-8 text-center space-y-3 md:space-y-4">
                    <p className="text-sm md:text-base text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 underline">
                            Log in
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

// Main component that wraps SignupForm in Suspense
const SignupPage = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <SignupForm />
        </Suspense>
    );
};

export default SignupPage;
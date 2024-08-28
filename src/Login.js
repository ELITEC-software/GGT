import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'admin' && password === 'admin') {
            onLogin();
        } else {
            alert('Nesprávné přihlašovací údaje');
        }
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen p-6">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                    <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="GGT Logo" className="w-full h-full object-contain rounded-md shadow-md" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-8 text-[#8D1737]">Přihlásit se</h2>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Heslo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 pr-10 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Heslo"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-[#8D1737] hover:bg-[#6D1229] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Přihlásit se
                        </button>
                    </div>
                </form>
                <div className="text-center mb-4">
                    <button 
                      className="inline-block align-baseline font-bold text-sm bg-transparent border-none cursor-pointer"
                      onClick={() => {/* Add your registration logic here */}}
                    >
                      <span className="text-zinc-500">Nejsi člen? </span>
                      <span className="text-[#8D1737] hover:text-[#6D1229]">Zaregistruj se!</span>
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <span className="text-zinc-500 text-sm">Vyber jazyk: </span>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <button className="focus:outline-none">
                        <img src={`${process.env.PUBLIC_URL}/czech-flag.png`} alt="Czech" className="w-12 h-12 shadow-md rounded-full" />
                    </button>
                    <button className="focus:outline-none">
                        <img src={`${process.env.PUBLIC_URL}/vietnam-flag.png`} alt="Vietnam" className="w-12 h-12 shadow-md rounded-full" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
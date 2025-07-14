import React from 'react';

const Footer = () => {
    return (
        <footer className="relative mt-16 py-8 text-center text-gray-400 text-sm border-t border-gray-800 bg-slate-800/60 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-2 left-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="absolute bottom-6 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>

                {/* Additional side elements */}
                <div className="absolute top-1/2 left-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-1/3 left-16 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 left-12 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>

                <div className="absolute top-1/2 right-8 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 right-12 w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
            </div>

            {/* Side decorative elements */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-800/50 via-slate-700/30 to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-800/50 via-slate-700/30 to-transparent"></div>

            {/* Geometric patterns on sides */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-10">
                <div className="w-8 h-8 border-2 border-red-500 rotate-45 animate-pulse"></div>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-10">
                <div className="w-8 h-8 border-2 border-red-500 rotate-45 animate-pulse"></div>
            </div>

            {/* Vertical accent lines */}
            <div className="absolute left-20 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
            <div className="absolute right-20 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>

            {/* Main content */}
            <div className="relative z-10">
                <div className="mb-4">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                        <svg className="w-6 h-6 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    </div>
                </div>

                <p className="font-bold font-sans text-lg mb-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    Crafted with ❤️ by
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-4">
                    <div className="group relative px-6 py-2 rounded-full bg-gradient-to-r from-red-900/50 to-red-700/50 border border-red-500/30 backdrop-blur-sm transition-all duration-700 ease-out hover:from-red-800/70 hover:to-red-600/70 hover:border-red-400/60 hover:shadow-sm hover:shadow-red-500/30 hover:scale-105 cursor-pointer overflow-hidden min-w-[160px]">
                        <div className="relative flex items-center justify-center w-full h-full gap-12">
                            <button
                                className="text-white font-semibold group-hover:text-red-100 transition-all duration-700 ease-out transform group-hover:-translate-x-6"
                                onClick={() => window.open('https://github.com/kalp202')}
                            >
                                Kalp Patel
                            </button>
                            <svg className="w-5 h-5 text-red-300 group-hover:text-red-100 absolute right-2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-x-8 group-hover:translate-x-4 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                    </div>

                    <div className="group relative px-6 py-2 rounded-full bg-gradient-to-r from-red-900/50 to-red-700/50 border border-red-500/30 backdrop-blur-sm transition-all duration-700 ease-out hover:from-red-800/70 hover:to-red-600/70 hover:border-red-400/60 hover:shadow-sm hover:shadow-red-500/30 hover:scale-105 cursor-pointer overflow-hidden min-w-[160px]">
                        <div className="relative flex items-center justify-center w-full h-full gap-12">
                            <button
                                className="text-white font-semibold group-hover:text-red-100 transition-all duration-700 ease-out transform group-hover:-translate-x-4"
                                onClick={() => window.open('https://github.com/BansalSwayam')}
                            >
                                Swayam Bansal
                            </button>
                            <svg className="w-5 h-5 text-red-300 group-hover:text-red-100 absolute right-2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-x-8 group-hover:translate-x-4 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                    </div>

                    <div className="group relative px-6 py-2 rounded-full bg-gradient-to-r from-red-900/50 to-red-700/50 border border-red-500/30 backdrop-blur-sm transition-all duration-700 ease-out hover:from-red-800/70 hover:to-red-600/70 hover:border-red-400/60 hover:shadow-sm hover:shadow-red-500/30 hover:scale-105 cursor-pointer overflow-hidden min-w-[160px]">
                        <div className="relative flex items-center justify-center w-full h-full gap-12">
                            <button
                                className="text-white font-semibold group-hover:text-red-100 transition-all duration-700 ease-out transform group-hover:-translate-x-4"
                                onClick={() => window.open('https://github.com/trivedi-utkarsh')}
                            >
                                Utkarsh Trivedi
                            </button>
                            <svg className="w-5 h-5 text-red-300 group-hover:text-red-100 absolute right-2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-x-8 group-hover:translate-x-4 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Built with Next.js</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Powered by AI</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span>Made with passion</span>
                    </div>
                </div> */}
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
        </footer>
    );
};

export default Footer;
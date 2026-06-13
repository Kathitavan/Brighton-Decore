import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';

const NotFound = () => {
  return (
    <PageTransition>
      <div className="h-screen w-full flex flex-col items-center justify-center bg-bg-primary text-center px-6">
        <h1 className="text-[12rem] font-serif text-gold leading-none opacity-20">404</h1>
        <div className="relative -mt-20 z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 italic">Lost in Space?</h2>
          <p className="text-ivory-muted text-lg mb-12 max-w-md mx-auto">
            The page you are looking for has been moved or doesn't exist in our design blueprint.
          </p>
          <Link to="/">
            <button className="bg-gold text-bg-primary px-12 py-5 uppercase tracking-[0.3em] font-bold text-xs hover:bg-white transition-all transform hover:scale-105 duration-300">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;

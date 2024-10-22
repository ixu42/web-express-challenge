import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img 
        src="../img/pikachu.png"
        alt="Sad Pikachu"
        className="w-60 h-60 mb-6" 
      />
      <h1 className="text-5xl leading-tight text-center mb-6">
        Page not found!
      </h1>
      <p className="text-2xl leading-8 text-center">
        Sorry! The page you're looking for is not found. <br />
      </p>
    </div>
  );
};

export default PageNotFound;

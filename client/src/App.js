import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter/AppRouter';
import Header from './components/Header/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-container">
        <AppRouter />
      </main>
    </BrowserRouter>
  );
};

export default App;

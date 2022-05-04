import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter/AppRouter';
import Header from './components/Header/Header';

const App = () => {
  return (
    <HashRouter>
      <Header />
      <main className="main-container">
        <AppRouter />
      </main>
    </HashRouter>
  );
};

export default App;

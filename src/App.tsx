// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/components/NavBar';
import routes from './components/Routes/AppRoutes';
import Footer from './components/Control/components/Footer';

function App() {
  return (
    <BrowserRouter>
      {/* El Navbar siempre estará visible */}
      <Navbar />

      {/* El contenido principal (las rutas) se renderizan fuera del Navbar */}
      <main>
        <Routes>
          {routes.map((route: { path: string | undefined; element: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

import { lazy, Suspense } from 'react';
import { CarsProvider } from './context/CarsContext';
import './App.css';

const CarListPage = lazy(() => import('./components/pages/CarListPage/CarListPage'));

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Car Rental</h1>
      </header>
      <main className="app-main">
        <CarsProvider>
          <Suspense fallback={<div>Loading cars...</div>}>
            <CarListPage />
          </Suspense>
        </CarsProvider>
      </main>
    </div>
  );
}

export default App;

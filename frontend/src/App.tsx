import { lazy, Suspense } from 'react';
import './App.css';

const CarList = lazy(() => import('@features/cars/CarList/CarList'));

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Car Rental</h1>
      </header>
      <main className="app-main">
        <Suspense fallback={<div>Loading...</div>}>
          <CarList />
        </Suspense>
      </main>
    </div>
  );
}

export default App;

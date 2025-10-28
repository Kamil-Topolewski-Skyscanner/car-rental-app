import { lazy, Suspense } from 'react';
import { CarsProvider } from './context/CarsContext';
import { DateRangeProvider } from './context/DateRangeContext';
import { Layout } from './components/layout/Layout/Layout';
import './App.css';

const CarListPage = lazy(() => import('./components/pages/CarListPage'));

function App() {
  return (
    <DateRangeProvider>
      <CarsProvider>
        <Layout>
          <Suspense fallback={<div>Loading cars...</div>}>
            <CarListPage />
          </Suspense>
        </Layout>
      </CarsProvider>
    </DateRangeProvider>
  );
}

export default App;

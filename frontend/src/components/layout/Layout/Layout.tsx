import { FC, ReactNode } from 'react';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

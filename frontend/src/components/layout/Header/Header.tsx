import { FC } from 'react';
import styles from './Header.module.css';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Car Rental</h1>
        <p className={styles.subtitle}>Find your perfect ride</p>
      </div>
    </header>
  );
};

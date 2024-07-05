import React from 'react';
import styles from '../styles/loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCircle}></div>
    </div>
  );
};

export default Loading;

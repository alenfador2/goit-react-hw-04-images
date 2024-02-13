import { InfinitySpin } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import css from './Loader.module.css';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className={css.loader_div}>
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
            loading={loading}
            className={css.loader}
          />
        </div>
      ) : null}
    </>
  );
};
export default Loader;

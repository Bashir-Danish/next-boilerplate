
import { useEffect, useState } from 'react';

export const useMounted = (callback) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (callback) {
      callback();
    }
  }, [callback]);
  return mounted;
};

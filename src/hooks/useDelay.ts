import { useEffect, useState } from 'react';

export function useIsMounted() {
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    const onPageLoad = () => {
      setPlayAnimation(true);
      return null;
    };

    setTimeout(() => {
      onPageLoad();
    }, 2000);

    return undefined;
  }, []);
  return playAnimation;
}

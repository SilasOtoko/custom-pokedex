import { useState } from 'react';

export function useUserAvatar(user) {
  const [imgError, setImgError] = useState(false);

  return {
    showFallback: imgError || !user?.photoURL,
    initial: user?.displayName?.[0]?.toUpperCase(),
    onError: () => setImgError(true),
  };
}

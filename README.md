Hook
************************ auto-hide.ts
import { useCallback, useEffect, useState } from 'react';

export const useAutoHide = (duration = 3000) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    return () => {
      clearTimeout(timeout);
    };
  }, [isVisible, duration]);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);
  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);
  return { isVisible, show, hide };
};

******************** copy-to-clipboard.ts
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';

interface Options {
  /**
   * Reset the status after a certain number of milliseconds. This is useful
   * for showing a temporary success message.
   */
  successDuration?: number;
}

export function useCopyClipboard(text: string, options?: Options): [boolean, () => void] {
  const [isCopied, setIsCopied] = useState(false);
  const successDuration = options && options.successDuration;
  useEffect(() => {
    if (isCopied && successDuration) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);
      return () => {
        clearTimeout(id);
      };
    }
    return () => null;
  }, [isCopied, successDuration]);

  return [
    isCopied,
    () => {
      const didCopy = copy(text);
      setIsCopied(didCopy);
    },
  ];
}
**************************************** toggle
import { ApiClient } from '@ott/api/dist/api-client';
import { useCallback, useEffect, useState } from 'react';

import { useRequireLogin } from './require-login';

export const useLike = (
  browserClient: ApiClient,
  isLoggedIn: boolean,
  itemType: 'VOD' | 'FILM' | 'LIVE',
  itemId: string | number,
  liked: boolean
) => {
  const [like, setLike] = useState(liked);

  useEffect(() => {
    setLike(liked);
  }, [liked, itemId]);

  const toggleLike = useCallback(async () => {
    setLike(!like);
    return (await browserClient.updateLike(itemType, itemId, !like)).data;
  }, [like, browserClient, itemType, itemId]);

  return { toggleLike: useRequireLogin(isLoggedIn, toggleLike), like: like };
};

export const useWatchLater = (
  browserClient: ApiClient,
  isLoggedIn: boolean,
  itemType: 'VOD' | 'FILM' | 'LIVE',
  itemId: string | number,
  isWatchLater: boolean
) => {
  const [watchLater, setWatchLater] = useState(isWatchLater);

  useEffect(() => {
    setWatchLater(isWatchLater);
  }, [isWatchLater, itemId]);

  const toggleWatchLater = useCallback(async () => {
    setWatchLater(!watchLater);
    return (await browserClient.updateWatchLater(itemType, itemId, !watchLater)).data;
  }, [watchLater, browserClient, itemType, itemId]);

  return { toggleWatchLater: useRequireLogin(isLoggedIn, toggleWatchLater), watchLater };
};

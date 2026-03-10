import React, { useEffect, useState } from 'react';
import { useAppDispatch } from './store/hooks';
import { Storage } from './utils/storage';
import {
  fetchCurrentUser,
  rehydrateAuth,
  setRehydrated,
} from './features/auth/slices/authSlice';
import { jwtDecode } from 'jwt-decode';

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = await Storage.getItem('auth-token');
        if (token) {
          const decoded = jwtDecode<{ sub: string }>(token);
          await dispatch(fetchCurrentUser(decoded.sub));
          dispatch(rehydrateAuth({ accessToken: token }));
        } else {
          dispatch(setRehydrated());
        }
      } catch (e) {
        console.error('Storage loading failed', e);
      } finally {
        setIsReady(true);
      }
    };
    initApp();
  }, [dispatch]);

  if (!isReady) return null;
  return <>{children}</>;
};

export default AppInitializer;

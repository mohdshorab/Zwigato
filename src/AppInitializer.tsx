import React, { useEffect, useState } from 'react';
import { useAppDispatch } from './store/hooks';
import { Storage } from './utils/storage';
import {
  rehydrateAuth,
  setRehydrated,
  User,
} from './features/auth/slices/authSlice';

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = await Storage.getItem('auth-token');
        const user = await Storage.getObject<User>('user');
        if (token && user) {
          dispatch(rehydrateAuth({ accessToken: token, user }));
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

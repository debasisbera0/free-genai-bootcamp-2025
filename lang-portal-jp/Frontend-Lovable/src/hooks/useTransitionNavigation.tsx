
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function useTransitionNavigation() {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPath, setTargetPath] = useState('');

  const transitionTo = (path: string) => {
    setIsNavigating(true);
    setTargetPath(path);
  };

  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        navigate(targetPath);
        setIsNavigating(false);
      }, 300); // Match your transition duration

      return () => clearTimeout(timer);
    }
  }, [isNavigating, navigate, targetPath]);

  return { transitionTo, isNavigating };
}

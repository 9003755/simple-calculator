/**
 * 主题管理Hook
 * 支持深色/浅色主题切换
 */

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeConfig {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

export const useTheme = (): ThemeConfig => {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  // 从localStorage加载主题设置
  useEffect(() => {
    const savedTheme = localStorage.getItem('calculator-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        setIsDark(mediaQuery.matches);
      }
    };

    handleChange(); // 初始检查
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // 应用主题
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemIsDark);
      root.classList.toggle('dark', systemIsDark);
    } else {
      const isDarkTheme = theme === 'dark';
      setIsDark(isDarkTheme);
      root.classList.toggle('dark', isDarkTheme);
    }
    
    localStorage.setItem('calculator-theme', theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    isDark,
  };
};
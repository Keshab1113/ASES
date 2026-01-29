import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    
    // Check system preference if no saved theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Determine initial theme
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    // Apply theme
    if (initialTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    // Debug log
    console.log('Theme toggled to:', newDarkMode ? 'dark' : 'light');
    console.log('HTML classes:', document.documentElement.className);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "rentride"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "rentride" ? "rentride-dark" : "rentride");
  };

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input 
        type="checkbox" 
        onChange={toggleTheme} 
        checked={theme === "rentride-dark"} 
      />
      
      <Sun className="swap-off h-5 w-5 text-base-content/70" />
      
      <Moon className="swap-on h-5 w-5 text-base-content/70" />
    </label>
  );
};

export default ThemeToggle;
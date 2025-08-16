import ThemeToggleButton from "./ui/theme-toggle-button";

const NavBar = () => {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
          My UI Project
        </h1>

        <div className="flex items-center gap-4">
          <ThemeToggleButton variant="circle-blur" start="top-left" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

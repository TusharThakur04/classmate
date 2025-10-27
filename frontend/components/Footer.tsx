export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 px-4 py-8 text-center text-sm text-gray-500 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
        <p>&copy; {new Date().getFullYear()} Classmate. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yourusername/classmate"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-700"
          >
            GitHub
          </a>
          <a href="/privacy" className="transition-colors hover:text-gray-700">
            Privacy Policy
          </a>
          <a href="/terms" className="transition-colors hover:text-gray-700">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

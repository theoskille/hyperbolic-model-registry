export function Footer() {
  return (
    <footer className="mt-8 border-t-2 border-foreground/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground/70">
            © {new Date().getFullYear()} Model Registry
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.linkedin.com/in/theo-skille-2b1741180/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/theoskille" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
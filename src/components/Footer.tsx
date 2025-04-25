export function Footer() {
  return (
    <footer className="mt-8 border-t-2 border-foreground/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground/70">
            © {new Date().getFullYear()} Model Registry
          </div>
          <div className="text-sm text-foreground/70">
            <a 
              href="https://github.com/yourusername/model-registry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
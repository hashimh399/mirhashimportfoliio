import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/70 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl tracking-tighter text-white">
              H.A.M<span className="text-blue-500">.</span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8 text-sm font-medium text-neutral-400">
              <li><Link href="#experience" className="hover:text-white transition-colors">Experience</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Solutions</Link></li>
            </ul>
          </nav>
          <div>
            <Link 
              href="#contact" 
              className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors"
            >
              Hire Me
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
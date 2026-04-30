import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Puzzle } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (hash: string) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-coral flex flex-col p-0 sm:p-2 md:p-4 relative overflow-hidden">
      {/* Decorative Puzzle Border Container */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         {/* Top Border */}
         <div className="absolute top-0 left-0 w-full flex space-x-4 p-2 justify-around">
            {[...Array(10)].map((_, i) => <Puzzle key={`t-${i}`} size={40} className="text-brand-blue" />)}
         </div>
         {/* Bottom Border */}
         <div className="absolute bottom-0 left-0 w-full flex space-x-4 p-2 justify-around">
            {[...Array(10)].map((_, i) => <Puzzle key={`b-${i}`} size={40} className="text-brand-yellow" />)}
         </div>
         {/* Left Border */}
         <div className="absolute top-0 left-0 h-full flex flex-col space-y-8 p-2 justify-around">
            {[...Array(6)].map((_, i) => <Puzzle key={`l-${i}`} size={40} className="text-brand-green" />)}
         </div>
         {/* Right Border */}
         <div className="absolute top-0 right-0 h-full flex flex-col space-y-8 p-2 justify-around">
            {[...Array(6)].map((_, i) => <Puzzle key={`r-${i}`} size={40} className="text-brand-red" />)}
         </div>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-none sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden mx-auto w-full md:w-[96%] max-w-[1600px]">
        <header className="bg-brand-coral text-white sticky top-0 z-50 shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Puzzle className="w-8 h-8 text-brand-yellow fill-current" />
              <span>Vanessa Lima</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8 text-lg font-medium">
              <button onClick={() => handleNav('#inicio')} className="hover:text-brand-yellow transition-colors cursor-pointer">Início</button>
              <button onClick={() => handleNav('#servicos')} className="hover:text-brand-yellow transition-colors cursor-pointer">Serviços</button>
              <Link to="/blog" className="hover:text-brand-yellow transition-colors cursor-pointer text-left">Blog</Link>
              <button onClick={() => handleNav('#contato')} className="hover:text-brand-yellow transition-colors cursor-pointer">Contato</button>
              <Link to="/admin" className="hover:text-brand-yellow transition-colors opacity-70 text-sm flex items-center cursor-pointer">Admin</Link>
            </nav>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-brand-coral/95 backdrop-blur-md absolute w-full left-0 border-t border-white/20">
              <nav className="flex flex-col p-6 space-y-4 text-center text-lg">
                <button onClick={() => handleNav('#inicio')}>Início</button>
                <button onClick={() => handleNav('#servicos')}>Serviços</button>
                <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                <button onClick={() => handleNav('#contato')}>Contato</button>
                <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              </nav>
            </div>
          )}
        </header>

        <main className="flex-1 bg-white text-gray-800 overflow-y-auto scroll-smooth">
          <Outlet />
        </main>
        
        <footer className="bg-brand-coral text-white py-8 text-center border-t border-brand-red/20">
          <div className="flex flex-col items-center justify-center space-y-2">
             <p className="font-medium">Vanessa Lima - Psicóloga e Mestranda</p>
             <p className="opacity-80">CRP: 06/157228</p>
             <div className="flex space-x-2 mt-4 text-brand-yellow">
                <Puzzle size={20} /> <Puzzle size={20} className="text-brand-blue" /> <Puzzle size={20} className="text-brand-green" />
             </div>
          </div>
        </footer>
      </div>

      {/* Botão de WhatsApp Flutuante */}
      <a
        href="https://wa.me/5511951772158"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] group"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute -inset-2 bg-[#25D366] rounded-full opacity-30 group-hover:opacity-50 animate-ping" style={{ animationDuration: '2s' }}></span>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" className="relative z-10">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      </a>
    </div>
  );
}

import { useEffect } from 'react';
import { HeartPulse, Brain, MessagesSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Services } from './Services';
import { Contact } from './Contact';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-full">
      <section id="inicio" className="px-6 py-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto flex-1 scroll-mt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-blue mb-6">Encontre o Equilíbrio e o Bem-Estar Mental</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10">Ofereço um espaço seguro, acolhedor e focado no seu desenvolvimento pessoal, tanto para crianças, adolescentes, quanto na orientação aos pais.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contato" onClick={(e) => scrollTo('contato', e)} className="bg-brand-coral hover:bg-brand-red text-white text-lg px-8 py-3 rounded-full font-semibold transition-all">Agendar Consulta</a>
          <a href="#servicos" onClick={(e) => scrollTo('servicos', e)} className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-lg px-8 py-3 rounded-full font-semibold transition-all">Meus Serviços</a>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Brain className="w-12 h-12 text-brand-green mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Psicoterapia Infantil</h3>
              <p className="text-gray-600">Atendimento lúdico focado nas emoções e no desenvolvimento saudável das crianças.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <HeartPulse className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Terapia para Adolescentes</h3>
              <p className="text-gray-600">Apoio em uma fase de grandes transições, ajudando na descoberta da identidade e superação de conflitos.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <MessagesSquare className="w-12 h-12 text-brand-yellow mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Orientação Parental</h3>
              <p className="text-gray-600">Acolhimento e auxílio aos cuidadores em suas práticas parentais e fortalecimento do vínculo familiar.</p>
           </div>
        </div>
      </section>

      <div id="servicos" className="pt-8 scroll-mt-20">
        <Services />
      </div>

      <div id="contato" className="bg-gray-50 pt-8 border-t border-gray-100 scroll-mt-20">
        <Contact />
      </div>
    </div>
  );
}

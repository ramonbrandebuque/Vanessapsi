import { BrainCircuit, Users, Puzzle } from 'lucide-react';

export function Services() {
  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-brand-blue mb-4">Meus Serviços</h1>
        <p className="text-lg text-gray-600">Conheça as áreas de atuação em que posso ajudar você e sua família.</p>
      </div>

      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-8 rounded-3xl">
          <div className="w-24 h-24 shrink-0 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center">
            <Puzzle size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Psicoterapia Infantil e Adolescência</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A psicoterapia com crianças utiliza recursos lúdicos para acessar as emoções, trabalhando os conflitos e angústias de forma adequada para a idade. Na adolescência, o espaço foca em dar voz às questões típicas desta fase de transição, construção da personalidade e busca de sentido, oferecendo acolhimento sem prejulgamentos.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 bg-brand-coral/5 p-8 rounded-3xl">
           <div className="w-24 h-24 shrink-0 bg-brand-coral/20 text-brand-coral rounded-full flex items-center justify-center">
            <Users size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Orientação Parental</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Um trabalho voltado aos pais e cuidadores. O objetivo é compreender como se dão as relações familiares, acolher as dificuldades da parentalidade e oferecer recursos para lidar com os desafios da educação emocional dos filhos, fortalecendo a relação de confiança mútua.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 bg-brand-blue/5 p-8 rounded-3xl">
           <div className="w-24 h-24 shrink-0 bg-brand-blue/20 text-brand-blue rounded-full flex items-center justify-center">
            <BrainCircuit size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Sobre Vanessa Lima</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sou Psicóloga Clínica e Mestranda, com expertise focada no desenvolvimento infantil e nas dinâmicas familiares. Acredito na terapia como um espaço de profundo respeito à história de cada um, construído através de uma escuta atenta e qualificada.
            </p>
            <p className="text-brand-blue font-semibold">CRP: 06/157228</p>
          </div>
        </div>
      </div>
    </div>
  );
}

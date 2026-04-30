import { useState } from 'react';
import { Phone, MapPin, Mail, Send } from 'lucide-react';

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        throw new Error('Falha ao enviar e-mail.');
      }
      
      setSent(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError('Ocorreu um erro ao enviar a mensagem. Verifique a configuração ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-brand-blue mb-6">Entre em contato</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Fique à vontade para me enviar uma mensagem, tirar dúvidas sobre as sessões ou agendar um horário. Responderei o mais breve possível.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center">
               <Phone size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1">Telefone/WhatsApp</p>
              <p className="text-lg text-gray-800">(11) 95177-2158</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center">
               <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1">Endereço de Atendimento</p>
              <p className="text-lg text-gray-800">Rua Professor João Arruda 189<br/>Perdizes, São Paulo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-coral/20 text-brand-coral rounded-full flex items-center justify-center">
               <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1">E-mail</p>
              <p className="text-lg text-gray-800">contato@vanessalimapsi.com.br</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-[300px] relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14631.63695278788!2d-46.67807094254877!3d-23.535815615750868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5818dafaab27%3A0xe5f9bce0be8c772e!2sR.%20Prof.%20Jo%C3%A3o%20Arruda%2C%20189%20-%20Perdizes%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005012-000!5e0!3m2!1spt-BR!2sbr!4v1714400000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Mapa do endereço de atendimento"
          ></iframe>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-100 p-8 shadow-xl rounded-3xl relative">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-brand-lightblue/30 rounded-full blur-2xl pointer-events-none"></div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Envie uma mensagem</h3>
        
        {sent ? (
          <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center border border-green-100">
             <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
             <p className="font-semibold text-lg">Mensagem enviada com sucesso!</p>
             <p className="text-sm mt-2 opacity-80">Entrarei em contato em breve.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 text-brand-red p-4 rounded-xl text-sm font-semibold">{error}</div>}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-coral/50" placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-coral/50" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-coral/50" placeholder="(11) 90000-0000" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mensagem</label>
              <textarea required rows={4} name="message" value={formData.message} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-coral/50" placeholder="Como posso ajudar?"></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-brand-coral hover:bg-brand-red text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70">
              {loading ? 'Enviando...' : (
                <>Enviar <Send size={20} /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

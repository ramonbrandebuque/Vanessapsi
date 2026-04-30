import { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, Image as ImageIcon, Save, LogOut } from 'lucide-react';

export function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [posts, setPosts] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  const fetchPosts = () => {
    fetch('/api/posts').then(res => res.json()).then(setPosts);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
    } else {
      setError(data.error);
    }
  };
  
  const handleLogout = () => {
     setToken(null);
     localStorage.removeItem('adminToken');
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('content', newContent);
    if (newImage) formData.append('image', newImage);

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (res.ok) {
      setNewTitle('');
      setNewContent('');
      setNewImage(null);
      fetchPosts();
    }
  };

  const executeDelete = async () => {
    if (postToDelete === null) return;
    setIsDeleting(true);
    const res = await fetch(`/api/posts/${postToDelete}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchPosts();
    setPostToDelete(null);
    setIsDeleting(false);
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 px-6">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 bg-brand-coral/20 text-brand-coral rounded-full flex items-center justify-center">
                <Lock size={32} />
             </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Área Restrita</h2>
          
          {error && <div className="bg-red-50 text-brand-red p-4 rounded-xl mb-6 font-medium text-center text-sm">{error}</div>}
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Usuário</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-coral/50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-coral/50" />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl mt-8 transition-colors">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-200">
         <h1 className="text-3xl font-bold text-gray-800">Painel de Administração</h1>
         <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-brand-red font-medium transition-colors">
            Sair <LogOut size={18} className="ml-2" />
         </button>
      </div>
      
      <div className="space-y-12">
        <div className="w-full">
          <form onSubmit={handleCreatePost} className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-brand-blue mb-4 flex items-center"><Plus size={32} className="mr-2" /> Novo Post</h2>
            
            <div>
               <label className="block text-lg font-semibold text-gray-700 mb-2">Título do Artigo</label>
               <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-brand-coral/50" placeholder="Ex: A importância do brincar..." />
            </div>
            
            <div className="flex-1">
               <label className="block text-lg font-semibold text-gray-700 mb-2">Conteúdo</label>
               <textarea required rows={16} value={newContent} onChange={e => setNewContent(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-brand-coral/50 resize-y" placeholder="Escreva o artigo completo aqui..."></textarea>
            </div>
            
            <div>
               <label className="block text-lg font-semibold text-gray-700 mb-2">Imagem de Capa (Opcional)</label>
               <div className="relative border-3 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center group cursor-pointer overflow-hidden">
                  <input type="file" accept="image/*" onChange={e => setNewImage(e.target.files?.[0] || null)}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  
                  {newImage ? (
                     <div className="text-center">
                       <ImageIcon className="w-12 h-12 text-brand-green mx-auto mb-3" />
                       <p className="text-lg font-bold text-brand-green px-4 text-center">{newImage.name}</p>
                     </div>
                  ) : (
                     <div className="text-center">
                        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 group-hover:text-brand-coral transition-colors" />
                        <span className="text-lg font-bold text-gray-500 block mb-1">Clique ou arraste a imagem aqui</span>
                        <span className="text-sm text-gray-400">Suporta JPG, PNG, WEBP</span>
                     </div>
                  )}
               </div>
            </div>

            <button type="submit" className="w-full md:w-auto self-end bg-brand-green hover:bg-brand-green/90 text-white font-bold py-4 px-12 text-lg rounded-2xl mt-4 transition-colors flex items-center justify-center shadow-lg shadow-brand-green/20">
              <Save size={24} className="mr-3" /> Publicar Artigo
            </button>
          </form>
        </div>

        <div className="w-full pt-8 border-t border-gray-200">
           <h2 className="text-3xl font-bold text-gray-800 mb-8">Artigos Publicados</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {posts.length === 0 ? (
                  <div className="col-span-full bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center text-gray-500 text-lg">
                     Nenhum post publicado ainda.
                  </div>
               ) : (
                  posts.map(post => (
                  <div key={post.id} className="bg-white border border-gray-100 shadow-sm p-6 rounded-3xl flex flex-col hover:shadow-lg transition-all relative overflow-hidden">
                     {post.imageUrl && (
                        <div className="h-32 -mx-6 -mt-6 mb-4 bg-gray-100">
                           <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                     )}
                     <div className="flex items-center text-sm text-brand-coral font-bold mb-2">
                        {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                     </div>
                     <h4 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">{post.title}</h4>
                     <p className="text-gray-500 text-base line-clamp-3 mb-6 flex-1">{post.content}</p>
                     <button onClick={() => setPostToDelete(post.id)} className="w-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl flex items-center justify-center transition-colors font-bold mt-auto cursor-pointer">
                        <Trash2 size={20} className="mr-2" /> Excluir
                     </button>
                  </div>
                  ))
               )}
           </div>
        </div>
      </div>

      {postToDelete !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Excluir Artigo?</h3>
            <p className="text-gray-600 mb-8">Esta ação não pode ser desfeita. Tem certeza que deseja remover este post do blog?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setPostToDelete(null)}
                className="px-6 py-3 font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button 
                onClick={executeDelete}
                className="px-6 py-3 font-semibold text-white bg-brand-red hover:bg-red-700 rounded-xl transition-colors flex items-center cursor-pointer"
                disabled={isDeleting}
              >
                {isDeleting ? 'Excluindo...' : 'Sim, Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

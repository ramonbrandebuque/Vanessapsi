import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-brand-blue mb-4">Blog</h1>
        <p className="text-lg text-gray-600">Reflexões, dicas e artigos sobre desenvolvimento infantil e parentalidade.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
           <div className="w-12 h-12 border-4 border-brand-coral border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-xl text-gray-500 font-medium">Nenhuma publicação ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all rounded-3xl overflow-hidden h-full">
              {post.imageUrl ? (
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-48 bg-brand-lightblue/20 flex items-center justify-center">
                  <span className="text-brand-blue text-Opacity-50 font-medium tracking-widest uppercase">Sem Imagem</span>
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-sm text-gray-400 mb-3 font-medium">
                  <Calendar size={14} className="mr-1" />
                  {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-coral transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-3 mb-6 flex-1">{post.content}</p>
                <div className="mt-auto text-brand-coral font-bold flex items-center group-hover:translate-x-2 transition-transform">
                  Ler artigo <ChevronRight size={18} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

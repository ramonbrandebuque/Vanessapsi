import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

export function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
     return (
        <div className="flex justify-center items-center h-screen border-t">
           <div className="w-12 h-12 border-4 border-brand-coral border-t-transparent rounded-full animate-spin"></div>
        </div>
     );
  }

  if (!post || 'error' in post) {
    return (
      <div className="text-center py-32 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post não encontrado.</h2>
        <Link to="/blog" className="text-brand-coral font-bold flex items-center justify-center">
          <ArrowLeft size={18} className="mr-1" /> Voltar para o Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/blog" className="inline-flex items-center text-brand-blue font-bold hover:text-brand-coral transition-colors mb-8 bg-brand-blue/5 hover:bg-brand-coral/5 px-4 py-2 rounded-full">
        <ArrowLeft size={18} className="mr-2" /> Voltar
      </Link>
      
      {post.imageUrl && (
        <div className="w-full h-[400px] md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-3xl mx-auto">
         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{post.title}</h1>
         
         <div className="flex items-center text-gray-500 font-medium pb-8 border-b border-gray-100 mb-8">
            <Calendar size={18} className="mr-2 text-brand-coral" />
            Publicado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
         </div>

         <div className="prose prose-lg prose-coral max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
            {post.content}
         </div>
      </div>
    </article>
  );
}

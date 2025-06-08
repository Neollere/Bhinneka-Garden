import React, { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { useAuth } from '~/lib/AuthContext';

interface Comment {
  id: string;
  news_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
  avatar_url?: string;
}

export default function Comments({ newsId }: { newsId: string }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string; avatar_url: string } | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [newsId]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
    }
    // eslint-disable-next-line
  }, [user]);

  async function fetchProfile() {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user?.id)
      .single();
    if (!error && data) {
      setProfile({ full_name: data.full_name, avatar_url: data.avatar_url });
    }
  }

  async function fetchComments() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profiles(full_name, avatar_url)')
        .eq('news_id', newsId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      // Map avatar and name from joined profile
      setComments(
        (data || []).map((c: any) => ({
          ...c,
          username: c.profiles?.full_name || c.username || 'User',
          avatar_url: c.profiles?.avatar_url || '',
        }))
      );
    } catch (err) {
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !profile || !content.trim()) return;
    setPosting(true);
    try {
      const { error } = await supabase.from('comments').insert([
        {
          news_id: newsId,
          user_id: user.id,
          username: profile.full_name,
          content,
        },
      ]);
      if (error) throw error;
      setContent('');
      fetchComments();
    } catch (err) {
      alert('Failed to post comment');
    } finally {
      setPosting(false);
    }
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <div className="flex items-center gap-3 mb-1">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {profile?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
              </div>
            )}
            <span className="font-semibold text-gray-800">{profile?.full_name || user.email}</span>
          </div>
          <textarea
            placeholder="Write a comment..."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={3}
            disabled={posting}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={posting || !content.trim()}
          >
            {posting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-6 text-gray-500">Sign in to post a comment.</div>
      )}
      {loading ? (
        <div className="text-gray-500">Loading comments...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : comments.length === 0 ? (
        <div className="text-gray-500">No comments yet.</div>
      ) : (
        <ul className="space-y-4">
          {comments.map(comment => (
            <li key={comment.id} className="border-b pb-2 flex gap-3">
              {comment.avatar_url ? (
                <img src={comment.avatar_url} alt="avatar" className="w-8 h-8 rounded-full object-cover mt-1" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mt-1">
                  {comment.username?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{comment.username}</div>
                <div className="text-gray-600 whitespace-pre-line">{comment.content}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(comment.created_at).toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

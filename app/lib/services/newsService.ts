import { supabase } from '~/lib/supabase';
import { generateNewsSlug } from '~/lib/slugify';
import type { NewsArticle } from '~/hooks/type';

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }

  return data.map(article => ({
    ...article,
    id: article.id.toString(),
    date: new Date(article.date).toISOString().split('T')[0],
    readTime: article.read_time,
  }));
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Article not found
    }
    console.error('Error fetching news article:', error);
    throw error;
  }

  return {
    ...data,
    id: data.id.toString(),
    date: new Date(data.date).toISOString().split('T')[0],
    readTime: data.read_time,
  };
}

export async function createNewsArticle(article: Omit<NewsArticle, 'id' | 'slug' | 'date'>): Promise<NewsArticle> {
  // Get existing slugs to ensure uniqueness
  const { data: existingArticles } = await supabase
    .from('news')
    .select('slug');

  const existingSlugs = existingArticles?.map(a => a.slug) || [];
  const slug = generateNewsSlug(article.title, existingSlugs);

  const { data, error } = await supabase
    .from('news')
    .insert([{
      ...article,
      read_time: article.readTime,
      slug,
      date: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating news article:', error);
    throw error;
  }

  return {
    ...data,
    id: data.id.toString(),
    date: new Date(data.date).toISOString().split('T')[0],
    readTime: data.read_time,
  };
}

export async function updateNewsArticle(
  id: string,
  updates: Partial<Omit<NewsArticle, 'id' | 'slug' | 'date'>>
): Promise<NewsArticle> {
  const { data, error } = await supabase
    .from('news')
    .update({
      ...updates,
      read_time: updates.readTime,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating news article:', error);
    throw error;
  }

  return {
    ...data,
    id: data.id.toString(),
    date: new Date(data.date).toISOString().split('T')[0],
    readTime: data.read_time,
  };
}

export async function deleteNewsArticle(id: string): Promise<void> {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting news article:', error);
    throw error;
  }
} 
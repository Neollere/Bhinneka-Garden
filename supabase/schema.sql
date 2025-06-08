-- Create a table for user profiles
create table profiles (
  id uuid references auth.users on delete cascade,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  email text,
  provider text,
  primary key (id)
);

-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email, provider)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.email,
    new.raw_user_meta_data->>'provider'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to call the function when a new user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for todos (as an example)
create table todos (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text,
  is_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for news articles
create table news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  summary text not null,
  content text not null,
  image text,
  tags text[],
  author text not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  read_time text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table todos enable row level security;
alter table news enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can view their own todos."
  on todos for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own todos."
  on todos for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own todos."
  on todos for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own todos."
  on todos for delete
  using ( auth.uid() = user_id );

create policy "News articles are viewable by everyone."
  on news for select
  using ( true );

create policy "Only authenticated users can insert news articles."
  on news for insert
  with check ( auth.role() = 'authenticated' );

create policy "Only authenticated users can update news articles."
  on news for update
  using ( auth.role() = 'authenticated' );

create policy "Only authenticated users can delete news articles."
  on news for delete
  using ( auth.role() = 'authenticated' );

-- Create a trigger to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_todos_updated_at
  before update on todos
  for each row
  execute procedure handle_updated_at();

create trigger handle_news_updated_at
  before update on news
  for each row
  execute procedure handle_updated_at(); 
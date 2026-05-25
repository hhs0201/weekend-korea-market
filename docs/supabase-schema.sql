-- Weekend Korea Market community schema draft
-- Run in Supabase SQL editor when replacing localStorage persistence.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  badge text default '개인 투자자',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  content text not null,
  category text not null,
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  content text not null,
  like_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.community_post_likes (
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table public.community_comment_likes (
  comment_id uuid not null references public.community_comments(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

alter table public.profiles enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_post_likes enable row level security;
alter table public.community_comment_likes enable row level security;

create policy "Profiles are readable" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Posts are readable" on public.community_posts for select using (true);
create policy "Signed users can insert posts" on public.community_posts for insert with check (auth.uid() = author_id);
create policy "Authors can update posts" on public.community_posts for update using (auth.uid() = author_id);
create policy "Authors can delete posts" on public.community_posts for delete using (auth.uid() = author_id);

create policy "Comments are readable" on public.community_comments for select using (true);
create policy "Signed users can insert comments" on public.community_comments for insert with check (auth.uid() = author_id);
create policy "Authors can delete comments" on public.community_comments for delete using (auth.uid() = author_id);

create policy "Users can like posts" on public.community_post_likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can like comments" on public.community_comment_likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/database/postgres/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
  for update using ((select auth.uid()) = owner) with check (bucket_id = 'avatars');


CREATE TABLE milk_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL
);

CREATE TABLE crust_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL
);

CREATE TABLE dough_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL
);

CREATE TABLE dairy (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  address VARCHAR(256) NOT NULL,
  city VARCHAR(256) NOT NULL,
  zip_code VARCHAR(256) NOT NULL
);

CREATE TABLE cheese_power (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL
);

CREATE TABLE cheese (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL UNIQUE,
  slug VARCHAR(256) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  aop_year INTEGER,
  aoc_year INTEGER,
  igp_year INTEGER,
  picture TEXT,
  deleted BOOLEAN DEFAULT FALSE,
  milk_type_id INT NOT NULL REFERENCES milk_type(id),
  crust_type_id INT NOT NULL REFERENCES crust_type(id),
  dough_type_id INT NOT NULL REFERENCES dough_type(id),
  cheese_power_id INT REFERENCES cheese_power(id)
);

CREATE TABLE optimal_tasting_period (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL
);

CREATE TABLE cheese_shop (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  address VARCHAR(256) NOT NULL,
  city VARCHAR(256) NOT NULL,
  zip_code VARCHAR(256) NOT NULL
);

CREATE TABLE cheese_producer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  address VARCHAR(256) NOT NULL,
  city VARCHAR(256) NOT NULL,
  zip_code VARCHAR(256) NOT NULL
);

CREATE TABLE lead (
  id SERIAL PRIMARY KEY,
  email VARCHAR(256) NOT NULL UNIQUE,
  "from" VARCHAR(256) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  rating DOUBLE PRECISION NOT NULL,
  review TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  cheese_id INT NOT NULL REFERENCES cheese(id),
  cheese_shop_id INT NOT NULL REFERENCES cheese_shop(id),
  cheese_producer_id INT REFERENCES cheese_producer(id),
  profile_id uuid NOT NULL REFERENCES profiles(id)
);

CREATE TABLE cheeses_to_periods (
  cheese_id INT NOT NULL REFERENCES cheese(id),
  optimal_tasting_period_id INT NOT NULL REFERENCES optimal_tasting_period(id),
  PRIMARY KEY (cheese_id, optimal_tasting_period_id)
);

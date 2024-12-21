CREATE TABLE todos (
  id bigint primary key generated always as identity,
  title text not null,
  priority text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted boolean default false
);
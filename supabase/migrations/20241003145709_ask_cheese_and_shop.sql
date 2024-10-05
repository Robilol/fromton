CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(2) NOT NULL
);

ALTER TABLE
    cheeses
ADD
    COLUMN country_id INTEGER NOT NULL REFERENCES countries(id);

create type status as enum ('pending', 'validated', 'rejected');

CREATE TABLE cheese_proposals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    rating DOUBLE PRECISION NOT NULL,
    review TEXT,
    status status DEFAULT 'pending' NOT NULL,
    milk_type_id INT NOT NULL REFERENCES milk_types(id),
    crust_type_id INT NOT NULL REFERENCES crust_types(id),
    dough_type_id INT NOT NULL REFERENCES dough_types(id),
    country_id INT NOT NULL REFERENCES countries(id),
    cheese_power_id INT REFERENCES cheese_powers(id),
    proposed_by_id uuid NOT NULL REFERENCES profiles(id),
    official_cheese_id INT REFERENCES cheeses(id),
    cheese_shop_id INT REFERENCES cheese_shops(id),
    cheese_producer_id INT REFERENCES cheese_producers(id)
);

CREATE TABLE cheese_shops_proposals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    address VARCHAR(256) NOT NULL,
    city VARCHAR(256) NOT NULL,
    zip_code VARCHAR(256) NOT NULL,
    status status DEFAULT 'pending' NOT NULL,
    proposed_by_id uuid NOT NULL REFERENCES profiles(id),
    official_cheese_shop_id INT REFERENCES cheese_shops(id)
);

CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE badge_levels (
    id SERIAL PRIMARY KEY,
    badge_id INTEGER NOT NULL REFERENCES badges(id),
    level INTEGER NOT NULL,
    requirement INTEGER NOT NULL,
    icon_url VARCHAR(255)
);

CREATE TABLE user_badges (
    id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id),
    badge_id INTEGER NOT NULL REFERENCES badges(id),
    current_level INTEGER NOT NULL,
    progress INTEGER NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE
    reviews
ADD
    COLUMN status status DEFAULT 'pending' NOT NULL;
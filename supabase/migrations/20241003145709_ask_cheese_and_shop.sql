
CREATE TABLE cheese_proposals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  aop_year INTEGER,
  aoc_year INTEGER,
  igp_year INTEGER,
  picture TEXT,
  milk_type_id INT NOT NULL REFERENCES milk_types(id),
  crust_type_id INT NOT NULL REFERENCES crust_types(id),
  dough_type_id INT NOT NULL REFERENCES dough_types(id),
  cheese_power_id INT REFERENCES cheese_powers(id),
  status VARCHAR(256) DEFAULT 'pending' NOT NULL,
  proposed_by_id uuid NOT NULL REFERENCES profiles(id),
  official_cheese_id INT REFERENCES cheeses(id)
);

CREATE TABLE cheese_shops_proposals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  address VARCHAR(256) NOT NULL,
  city VARCHAR(256) NOT NULL,
  zip_code VARCHAR(256) NOT NULL,
  status VARCHAR(256) DEFAULT 'pending' NOT NULL,
  proposed_by_id uuid NOT NULL REFERENCES profiles(id),
  official_cheese_shop_id INT REFERENCES cheese_shops(id)
);

CREATE TABLE temporary_reviews (
  id SERIAL PRIMARY KEY,
  rating DOUBLE PRECISION NOT NULL,
  review TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  cheese_id INT NOT NULL REFERENCES cheeses(id),
  cheese_shop_id INT REFERENCES cheese_shops(id),
  cheese_producer_id INT REFERENCES cheese_producers(id),
  profile_id uuid NOT NULL REFERENCES profiles(id),
  cheese_proposal_id INT NOT NULL REFERENCES cheese_proposals(id),
  cheese_shop_proposal_id INT REFERENCES cheese_shops_proposals(id),
  CONSTRAINT check_at_least_one_defined CHECK (cheese_shop_id IS NOT NULL OR cheese_shop_proposal_id IS NOT NULL)
);

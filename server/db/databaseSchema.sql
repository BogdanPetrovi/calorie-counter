CREATE DATABASE "calorie_counter";

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TYPE genders AS ENUM ('Male', 'Female');
CREATE TYPE goals AS ENUM ('lose', 'maintain', 'gain');

CREATE TABLE user_profiles(
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  gender genders NOT NULL,
  weight_kg FLOAT NOT NULL,
  height_cm FLOAT NOT NULL,
  date_of_birth DATE NOT NULL,
  activicy_level INTEGER NOT NULL,
  target_daily_calories INT NOT NULL,
  goal goals NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE meal_types AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');

CREATE TABLE food_entries(
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  food_name TEXT NOT NULL,
  calories FLOAT NOT NULL,
  meal_type meal_types NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
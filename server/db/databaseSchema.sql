CREATE DATABASE "calorie_counter";

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE user_profiles(
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  gender ENUM('Male', 'Female') NOT NULL,
  weight_kg FLOAT NOT NULL,
  height_cm FLOAT NOT NULL,
  date_of_birth DATE,
  activicy_level ENUM(0, 1, 3, 6) NOT NULL,
  target_daily_calories INT,
  goal ENUM('lose', 'maintain', 'gain'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE food_entries(
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  food_name TEXT NOT NULL,
  calories FLOAT NOT NULL,
  meal_type ENUM('breakfast', 'lunch', 'dinner', 'snack'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
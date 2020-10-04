DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR NOT NULL,
    price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews
(
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurants (id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5)
);

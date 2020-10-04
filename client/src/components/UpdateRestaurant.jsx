import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RestaurantsApi from "../api/RestaurantsApi";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantsApi.get(`/${id}`);
        const { name, location, price_range } = response.data.data.restaurant;
        setName(name);
        setLocation(location);
        setPriceRange(price_range);
      } catch (err) {
        console.log(err.stack);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantsApi.put(`/${id}`, {
      name: name,
      location: location,
      price_range: priceRange,
    });
    history.push("/");
  };

  return (
    <div className="card border-danger mx-sm-4 my-4 shadow p-3">
      <form action="">
        <div className="form-group mx-sm-2 my-4">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group mx-sm-2 my-4">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            name="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group mx-sm-2 my-4">
          <label htmlFor="priceRange">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            name="priceRange"
            id="priceRange"
            className="form-control"
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-danger mx-sm-2 my-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;

import React, { useContext, useState } from "react";
import RestaurantsApi from "../api/RestaurantsApi";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsList from "./RestaurantsList";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantsApi.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
    } catch (err) {
      console.log(err.stack);
    }
  };

  return (
    <div className="card border-danger mx-sm-4 my-4 shadow p-3">
      <form action="" className="form-inline justify-content-center">
        <div className="form-group mx-sm-2 my-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="form-group mx-sm-2 my-5">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Location"
          />
        </div>
        <div className="form-group mx-sm-2 my-5">
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
        <div className="form-group mx-sm-2 my-5">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-danger"
          >
            Add
          </button>
        </div>
      </form>
      <RestaurantsList />
    </div>
  );
};

export default AddRestaurant;

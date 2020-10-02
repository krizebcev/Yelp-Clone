import React from "react";
import RestaurantsList from "./RestaurantsList";

const AddRestaurant = () => {
  return (
    <div className="card border-danger mx-sm-4 my-4 shadow p-3">
      <form action="" className="form-inline justify-content-center">
        <div className="form-group mx-sm-2 my-5">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="form-group mx-sm-2 my-5">
          <input type="text" className="form-control" placeholder="Location" />
        </div>
        <div className="form-group mx-sm-2 my-5">
          <select name="priceRange" id="priceRange" className="form-control">
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div className="form-group mx-sm-2 my-5">
          <button className="btn btn-danger">Add</button>
        </div>
      </form>
      <RestaurantsList />
    </div>
  );
};

export default AddRestaurant;

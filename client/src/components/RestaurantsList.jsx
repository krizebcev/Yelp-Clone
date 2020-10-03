import React, { useContext, useEffect } from "react";
import RestaurantsApi from "../api/RestaurantsApi";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantsList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantsApi.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err.stack);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="list-group table-responsive">
      <table className="table table-striped">
        <thead className="bg-danger text-white">
          <tr>
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>Ratings</td>
                  <td>
                    <button className="btn btn-warning">Update</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsList;

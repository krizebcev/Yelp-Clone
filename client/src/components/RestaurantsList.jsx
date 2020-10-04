import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RestaurantsApi from "../api/RestaurantsApi";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantsList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();

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

  const handleDelete = async (id) => {
    try {
      const response = await RestaurantsApi.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      console.log(err.stack);
    }
  };

  const handleUpdate = (id) => {
    history.push(`/restaurants/${id}/update`);
  };

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
                  <td>
                    <span className="fas fa-utensils mr-3"></span>
                    {restaurant.name}
                  </td>
                  <td>
                    <span className="fas fa-map-marker-alt mr-2"></span>
                    {restaurant.location}
                  </td>
                  <td>
                    {[...Array(restaurant.price_range)].map(() => (
                      <span className="fas fa-dollar-sign mx-1"></span>
                    ))}
                  </td>
                  <td>Ratings</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="btn btn-secondary"
                    >
                      Delete
                    </button>
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

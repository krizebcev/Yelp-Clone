import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RestaurantsApi from "../api/RestaurantsApi";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

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

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantsApi.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      console.log(err.stack);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    console.log(restaurant);
    if (!restaurant.count) {
      return <span className="text-warning">No reviews</span>;
    }
    return (
      <React.Fragment>
        <StarRating rating={restaurant.id} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </React.Fragment>
    );
  };

  return (
    <div className="list-group table-responsive">
      <table className="table table-hover">
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
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
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
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
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

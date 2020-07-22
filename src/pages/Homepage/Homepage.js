import React from "react";
import "./Homepage.css";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_SOPPING_LISTS, GET_USER } from "../../graphql/queries";

export default function Homepage() {
  // const { loading, error, data } = useQuery(GET_SOPPING_LISTS);
  const { loading, error, data } = useQuery(GET_USER);
  console.log("data", data);

  if (loading) return "Loading...";
  if (error) return error.message;

  return (
    <div>
      <h1>All shopping lists here</h1>
    </div>
  );
}

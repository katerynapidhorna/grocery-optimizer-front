import gql from "graphql-tag";

export const GET_MESSAGE = gql`
  query {
    message
  }
`;

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
    }
  }
`;

export const GET_SOPPING_LISTS = gql`
  query {
    shoppingLists {
      id
      title
    }
  }
`;

export const GET_USER = gql`
  query {
    users {
      id
      email
    }
  }
`;

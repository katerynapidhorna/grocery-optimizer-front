import gql from "graphql-tag";

export const GET_SHOPPING_LISTS = gql`
  query {
    shoppingLists {
      id
      title
    }
  }
`;

export const GET_SHOPPING_LIST = gql`
  query Ppp($id: Int!) {
    shoppingList(id: $id) {
      id
      title
      products {
        id
        name
        unit
        purchased
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    user {
      id
    }
    shoppingLists {
      id
      userId
      title
      products {
        id
        name
        unit
        amount
        purchased
      }
    }
  }
`;

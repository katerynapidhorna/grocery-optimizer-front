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
  query ShoppingList($id: Int!) {
    shoppingList(id: $id) {
      id
      title
      products {
        id
        name
        unit
        purchased
        amount
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

export const PRICE_INPUT = gql`
  query PriceInput($id: Int!) {
    stores {
      id
      name
    }
    shoppingList(id: $id) {
      title
      products {
        id
        name
        prices {
          storeId
          price
        }
      }
    }
  }
`;

export const PRICE_COMPARISON = gql`
  query PriceInput($id: Int!) {
    stores {
      id
      name
    }
    shoppingList(id: $id) {
      products {
        id
        name
        amount
        prices {
          storeId
          price
        }
      }
    }
  }
`;

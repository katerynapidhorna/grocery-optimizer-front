import gql from "graphql-tag";

export const ADD_SHOPPING_LIST = gql`
  mutation AddShoppinList($title: String!, $userId: Int!) {
    addShoppinList(title: $title, userId: $userId) {
      title
      userId
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation CreateNewUser($email: String!, $password: String!) {
    createNewUser(email: $email, password: $password) {
      email
      password
    }
  }
`;

export const UPDATE_SHOPPING_LIST = gql`
  mutation UpdateShoppingList(
    $title: String!
    $id: Int!
    $products: [ShoppingListUpdateItem]!
  ) {
    updateShoppingList(
      list: { title: $title, id: $id }
      products: $products
    ) {
      products {
        name
      }
    }
  }
`;

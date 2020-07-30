import gql from "graphql-tag";

export const ADD_SHOPPING_LIST = gql`
  mutation AddShoppinList($title: String!) {
    addShoppinList(title: $title) {
      id
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
    updateShoppingList(list: { title: $title, id: $id }, products: $products) {
      products {
        name
      }
    }
  }
`;

export const UPDATE_PRICES = gql`
  mutation UpdatePrices($prices: [NewProductPrices]!) {
    updatePrices(prices: $prices) {
      success
    }
  }
`;

export const UPDATE_PURCHASED = gql`
  mutation UpdatePurchased($productId: [Int],$purchased: Boolean!) {
    updatePurchased(productId:$productId,purchased:$purchased) {
      productId
      purchased
    }
  }
`

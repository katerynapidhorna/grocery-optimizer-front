import gql from "graphql-tag";


export const ADD_SHOPPING_LIST = gql`
mutation AddShoppinList($title: String!, $userId: Int!){
   addShoppinList(title:$title,userId:$userId) {
     title
     userId
   }
  }


`
import { useQuery, gql } from "@apollo/client";

const POSES_QUERY = gql`
  {
    poses{
        id
        name
        image
        status
        tag
        foundPlace
        returnPlace
        description
    }
  }
`;
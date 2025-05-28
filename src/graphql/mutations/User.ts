import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($clientId: String!, $credential: String!) {
    loginLanding(
      loginLandingInput: { clientId: $clientId, credential: $credential }
    )
  }
`;

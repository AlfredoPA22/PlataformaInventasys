import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation loginLanding($clientId: String!, $credential: String!) {
    loginLanding(
      loginLandingInput: { clientId: $clientId, credential: $credential }
    )
  }
`;

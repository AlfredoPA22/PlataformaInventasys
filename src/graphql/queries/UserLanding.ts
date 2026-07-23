import { gql } from "@apollo/client";

export const LIST_USER_LANDING_ADMIN = gql`
  query ListUserLandingAdmin {
    listUserLandingAdmin {
      _id
      email
      fullName
      picture
      user_type
      createdAt
      companies {
        _id
        name
        plan
        status
        subscription_expires_at
        trial_expires_at
        subscriptions {
          system
          plan
          status
        }
      }
    }
  }
`;

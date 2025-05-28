import { gql } from "@apollo/client";

export const LIST_COMPANY = gql`
  query ListCompany {
    listCompany {
      _id
      address
      country
      currency
      email
      image
      legal_name
      name
      nit
      phone
      plan
      status
      subscription_expires_at
      trial_expires_at
      latest_payment {
        _id
        status
      }
    }
  }
`;

export const LIST_COMPANY_ADMIN = gql`
  query ListCompanyAdmin {
    listCompanyAdmin {
      _id
      address
      country
      currency
      email
      image
      legal_name
      name
      nit
      phone
      plan
      status
      subscription_expires_at
      trial_expires_at
      latest_payment {
        _id
        status
      }
    }
  }
`;

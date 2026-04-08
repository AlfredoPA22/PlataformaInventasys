import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $name: String!
    $legal_name: String
    $email: String
    $nit: String
    $country: String
    $address: String
    $phone: String
    $plan: String!
    $currency: String!
    $system: String
  ) {
    createCompany(
      companyInput: {
        name: $name
        legal_name: $legal_name
        email: $email
        nit: $nit
        country: $country
        address: $address
        phone: $phone
        plan: $plan
        currency: $currency
        system: $system
      }
    ) {
      adminCredentials {
        password
        user_name
      }
      company {
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
        subscriptions {
          system
          plan
          status
          trial_expires_at
          subscription_expires_at
        }
      }
    }
  }
`;

export const ACTIVATE_COMPANY = gql`
  mutation Mutation($companyId: String!) {
    activateCompany(companyId: $companyId) {
      _id
    }
  }
`;

export const ADJUST_SUBSCRIPTION = gql`
  mutation AdjustSubscription(
    $companyId: String!
    $system: String!
    $plan: String!
    $status: String!
    $subscription_expires_at: String
    $trial_expires_at: String
  ) {
    adjustSubscription(
      input: {
        companyId: $companyId
        system: $system
        plan: $plan
        status: $status
        subscription_expires_at: $subscription_expires_at
        trial_expires_at: $trial_expires_at
      }
    ) {
      _id
      plan
      status
      subscription_expires_at
      trial_expires_at
      subscriptions {
        system
        plan
        status
        trial_expires_at
        subscription_expires_at
      }
    }
  }
`;

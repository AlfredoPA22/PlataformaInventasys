import { gql } from "@apollo/client";

export const LIST_PAYMENT_BY_COMPANY = gql`
  query ListPaymentLandingByCompany($companyId: String!) {
    listPaymentLandingByCompany(companyId: $companyId) {
      _id
      amount
      billing_info {
        email
        name
        nit
      }
      company {
        _id
        name
      }
      currency
      method
      paid_at
      plan
      proof_url
      status
    }
  }
`;

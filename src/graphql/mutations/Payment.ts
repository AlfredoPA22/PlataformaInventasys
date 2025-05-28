import { gql } from "@apollo/client";

export const CREATE_PAYMENT = gql`
  mutation CreatePaymentLanding(
    $amount: Float!
    $billing_email: String
    $billing_name: String
    $billing_nit: String
    $company: String!
    $currency: String!
    $method: String!
    $plan: String!
    $proof_url: String!
  ) {
    createPaymentLanding(
      paymentLandingInput: {
        amount: $amount
        billing_email: $billing_email
        billing_name: $billing_name
        billing_nit: $billing_nit
        company: $company
        currency: $currency
        method: $method
        plan: $plan
        proof_url: $proof_url
      }
    ) {
      _id
      amount
      billing_info {
        nit
        name
        email
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

export const APPROVE_PAYMENT = gql`
  mutation Mutation($paymentId: String!) {
    approvePaymentLanding(paymentId: $paymentId) {
      _id
    }
  }
`;

export const REJECT_PAYMENT = gql`
  mutation Mutation($paymentId: String!) {
    rejectPaymentLanding(paymentId: $paymentId) {
      _id
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePaymentLanding($paymentId: String!, $proof_url: String!) {
    updatePaymentLanding(paymentId: $paymentId, proof_url: $proof_url) {
      _id
      status
      proof_url
    }
  }
`;

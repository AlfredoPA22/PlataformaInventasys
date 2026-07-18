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
      subscriptions {
        system
        plan
        status
        trial_expires_at
        subscription_expires_at
        notified_before_expiration
      }
      latest_payment {
        _id
        status
        paid_at
        plan
        system
      }
    }
  }
`;

export const COMPANY_DELETION_REPORT = gql`
  query CompanyDeletionReport($companyId: ID!) {
    companyDeletionReport(companyId: $companyId) {
      companyName
      products
      brands
      categories
      providers
      clients
      warehouses
      roles
      users
      saleOrders
      saleOrderDetails
      purchaseOrders
      purchaseOrderDetails
      salePayments
      saleReturns
      saleReturnDetails
      productTransfers
      productTransferDetails
      productInventory
      productSerials
      notifications
      payments
      codeGenerators
    }
  }
`;

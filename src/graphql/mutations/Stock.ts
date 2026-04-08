import { gql } from "@apollo/client";

export const RECONCILE_STOCK = gql`
  mutation ReconcileStock {
    reconcileStock {
      totalProducts
      updated
      unchanged
      errors
      changes {
        productId
        name
        companyId
        companyName
        stock_type
        stockBefore
        stockAfter
        statusBefore
        statusAfter
      }
    }
  }
`;

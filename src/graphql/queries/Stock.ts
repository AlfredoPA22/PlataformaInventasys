import { gql } from "@apollo/client";

export const AUDIT_STOCK = gql`
  query AuditStock {
    auditStock {
      totalProducts
      ok
      errors
      discrepancies {
        productId
        code
        name
        stock_type
        companyId
        companyName
        stockActual
        stockCorrecto
        statusActual
        statusCorrecto
        diff
      }
    }
  }
`;

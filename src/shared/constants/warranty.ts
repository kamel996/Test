
export interface WarrantyPolicy {
    name: string;
    type: 'Parts' | 'Services';
    supplier: string;
    supplierNumber: string;
    validUntil: string; 
  }

  export type WarrantyTypes = 'Parts' | 'Services';
  
  export const warrantyPolicies: WarrantyPolicy[] = [
    {
      name: "Basic Parts Warranty",
      type: "Parts",
      supplier: "Supplier A",
      supplierNumber: "123-456-789",
      validUntil: "2025-12-31",
    },
    {
      name: "Extended Service Warranty",
      type: "Services",
      supplier: "Supplier B",
      supplierNumber: "987-654-321",
      validUntil: "2026-06-30",
    },
    {
      name: "Premium Parts Warranty",
      type: "Parts",
      supplier: "Supplier C",
      supplierNumber: "456-789-123",
      validUntil: "2027-03-15",
    },
    {
      name: "Standard Service Warranty",
      type: "Services",
      supplier: "Supplier D",
      supplierNumber: "321-654-987",
      validUntil: "2024-11-20",
    },
  ];
  
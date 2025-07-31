// /lib/mock-data.ts
import { Application } from "@/types";

export const mockApplications: Application[] = [
  {
    id: '1',
    businessName: 'Tech Startup',
    type: 'SARL',
    region: 'Southwest',
    submittedDate: '2025-07-15',
    status: 'Draft',
    isOptimistic: false,
  },
  {
    id: '2',
    businessName: 'Artisan Bakery',
    type: 'ETS',
    region: 'Littoral',
    submittedDate: '2025-05-05',
    status: 'Approved',
    isOptimistic: false,
  },
  {
    id: '3',
    businessName: 'Fashion Boutique',
    type: 'SARL',
    region: 'Centre',
    submittedDate: '2025-04-10',
    status: 'Rejected',
    isOptimistic: false,
  },
  
    
];
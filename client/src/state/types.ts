export interface SchoolSignup {
    type: string;
    signups: number;
  }
  
export interface ProductSignup {
    product: string;
    schools: SchoolSignup[];
}

export interface Invoice {
    schoolName: string;
    invoiceNumber: string;
    invoiceItem: string;
    amountDue: number;
    paidAmount: number;
    balance: number;
    creationDate: string;
    dueDate: string;
    completionStatus: string;
    daysUntilDue: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actions: any[]; 
}
  

export interface School {
    name: string;
    type: string;
    product: string;
    county: string;
    registrationDate: string;
    contactInformation: {
      phone: string;
      email: string;
    };
}
export interface Collection {
    invoiceNumber: string;
    collectionNumber: string;
    collectionDate: string;
    status: "Valid" | "Bounced";
    amountCollected: number;
}
export interface Metrics {
    collections: number;
    signups: {
      total: number;
      breakdown: {
        [key: string]: number;
      };
    };
    revenue: {
      total: number;
      breakdown: {
        [key: string]: number;
      };
    };
    bouncedCheques: number;
}  
 

export type GetMetricsData = Metrics;
export type GetSignupData = ProductSignup[];
export type GetSchoolData = School[];
export type GetInvoiceData = Invoice[];
export type GetCollectionData = Collection[];

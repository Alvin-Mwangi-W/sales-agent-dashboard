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
    schoolName: string;
    amountCollected: number;
    collectionDate: string;
}
  
export type GetSignupData = ProductSignup[];
export type GetSchoolData = School[];
export type GetInvoiceData = Invoice[];
export type GetCollectionData = Collection[];

export interface Invoice {
    _id: string;
    // from: From;
    client: Client;
    komnumber: string;
    date: string;
    dueDate: string;
    services: Services[];
    mainProduct: Services[];
    services2: Services[];
    subtotal: number;
    tax: number;
    discount: number;
    finalTotal: number;
    user: string;
    toContact: string;
    salutation: string;
    invoiceNumber: string;
    workDescription: string;
   name1: string;
    name2: string;
   name3: string;


}

export interface Client {
    companyName: string;
    name: string;
    address: string;
    phone: string;
    website: string;
    clientEmail: string;
    postcode: string;
    location: string;
}

export interface Services {
    title: string;
    caption: string;
    detail: string;
    price: number;
}
export interface MainProduct {
    title: string;
    caption: string;
    detail: string;
    price: number;
}
export interface items {
    
}

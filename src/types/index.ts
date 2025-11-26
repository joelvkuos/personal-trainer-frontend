export interface Customer {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links?: {
        self: { href: string };
        customer?: { href: string };
        trainings?: { href: string };
    }
}

export interface Training {
    id: number;
    date: string;
    duration: number;
    activity: string;
    customer: Customer;
}

export interface CustomerResponse {
    _embedded: {
        customers: Customer[];
    }

}


import { Customer, CustomerResponse, Training } from '../types';

const API_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

export const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await fetch(`${API_URL}/customers`);
    const data: CustomerResponse = await response.json();
    return data._embedded.customers;
};

export const fetchTrainings = async (): Promise<Training[]> => {
    const response = await fetch(`${API_URL}/gettrainings`);
    const data: Training[] = await response.json();
    return data;
}
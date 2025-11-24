import type { Customer, CustomerResponse, Training } from '../types';

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

export const addCustomer = async (customer: Omit<Customer, '_links'>): Promise<Customer> => {
    const response = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });
    return response.json();
};

export const updateCustomer = async (url: string, customer: Omit<Customer, '_links'>): Promise<Customer> => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });
    return response.json();
};

export const deleteCustomer = async (url: string): Promise<void> => {
    await fetch(url, { method: 'DELETE' });
}

export const addTraining = async (training: { date: string; duration: number; activity: string; customer: string; }): Promise<Training> => {
    const response = await fetch(`${API_URL}/trainings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training),
    });
    return response.json();
};

export const deleteTraining = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/trainings/${id}`, { method: 'DELETE' });
};
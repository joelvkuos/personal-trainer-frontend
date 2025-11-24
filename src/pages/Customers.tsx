import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { Customer } from '../types';
import { fetchCustomers } from '../services/api';
import { Button } from '@mui/material';
import CustomerDialog from '../components/CustomerDialog';
import { addCustomer, updateCustomer, deleteCustomer } from '../services/api';

function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        fetchCustomers()
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));

    }, []);

    const handleAddClick = () => {
        setEditingCustomer(null);
        setDialogOpen(true);
    };

    const handleEditClick = (customer: Customer) => {
        setEditingCustomer(customer);
        setDialogOpen(true);
    };

    const handleDelete = (customer: Customer) => {
        if (window.confirm(`Delete ${customer.firstname} ${customer.lastname}?`)) {
            deleteCustomer(customer._links!.self.href)
                .then(() => {
                    setCustomers(customers.filter(c => c.email !== customer.email));
                })
                .catch(error => console.error('Error deleting customer:', error));
        }
    };

    const handleSave = (customerData: Omit<Customer, '_links'>) => {
        if (editingCustomer) {
            updateCustomer(editingCustomer._links!.self.href, customerData)
                .then(() => {
                    fetchCustomers().then(data => setCustomers(data));
                })
                .catch(error => console.error('Error updating customer:', error));
        } else {
            addCustomer(customerData)
                .then(() => {
                    fetchCustomers().then(data => setCustomers(data));
                })
                .catch(error => console.error('Error adding customer:', error));
        }
    };

    const columns = [
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 200, sortable: false, filterable: false, renderCell: (params: any) => (
                <>
                    <Button size="small" onClick={() => handleEditClick(params.row)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(params.row)}>Delete</Button>
                </>
            )
        },
    ];

    return (
        <div>
            <h1>Customers</h1>
            <Button variant="contained" onClick={handleAddClick} style={{ marginBottom: '1rem' }}>
                Add Customer
            </Button>
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={(row) => row.email}
            />
            <CustomerDialog
                open={dialogOpen}
                customer={editingCustomer}
                onClose={() => { setDialogOpen(false); }}
                onSave={handleSave}
            />
        </div>
    );
}

export default Customers;
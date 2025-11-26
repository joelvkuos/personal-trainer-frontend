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

    const handleExportCSV = () => {
        const headers = ['Firstname', 'Lastname', 'Email', 'Phone', 'Street Address', 'Postcode', 'City'];

        const rows = customers.map(customer => [
            customer.firstname,
            customer.lastname,
            customer.email,
            customer.phone,
            customer.streetaddress,
            customer.postcode,
            customer.city,
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'customers.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        <div style={{ color: '#D1F0FD' }}>
            <h1>Customers</h1>
            <Button
                variant="outlined"
                onClick={handleAddClick}
                sx={{
                    marginBottom: '1rem',
                    color: '#D1F0FD',
                    borderColor: '#D1F0FD',
                    '&:hover': {
                        borderColor: '#D1F0FD',
                        backgroundColor: 'rgba(209, 240, 253, 0.1)'
                    }
                }}
            >
                Add Customer
            </Button>
            <Button
                variant='outlined'
                onClick={handleExportCSV}
                sx={{
                    marginBottom: '1rem',
                    marginLeft: '0.5rem',
                    color: '#D1F0FD',
                    borderColor: '#D1F0FD',
                    '&:hover': {
                        borderColor: '#D1F0FD',
                        backgroundColor: 'rgba(209, 240, 253, 0.1)'
                    }
                }}
            >
                Export CSV
            </Button>
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={(row) => row._links?.self.href || row.email}
                sx={{
                    backgroundColor: '#fff',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#8B8680',
                        color: '#D1F0FD',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid #8B8680'
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(209, 240, 253, 0.1)'
                    }
                }}
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
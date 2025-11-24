import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { Customer } from '../types';
import { fetchCustomers } from '../services/api';

function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchCustomers()
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));

    }, []);

    const columns = [
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 150 },
    ];

    return (
        <div>
            <h1>Customers</h1>
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={(row) => row.email}
            />
        </div>
    );
}

export default Customers;
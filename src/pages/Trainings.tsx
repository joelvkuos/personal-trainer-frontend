import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { Training } from '../types';
import { fetchTrainings } from '../services/api';
import { format } from 'date-fns';

function Trainings() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    useEffect(() => {
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(error => console.error('Error fetching trainings:', error));
    }, []);

    const columns = [
        {
            field: 'date',
            headerName: 'Date',
            width: 180,
            valueFormatter: (value: string) => {
                return format(new Date(value), 'dd.MM.yyyy HH:mm');
            }
        },
        { field: 'duration', headerName: 'Duration (min)', width: 150 },
        { field: 'activity', headerName: 'Activity', width: 200 },
        {
            field: 'customer',
            headerName: 'Customer',
            width: 200,
            valueGetter: (value: any) => {
                return `${value.firstname} ${value.lastname}`;
            }
        },
    ];

    return (
        <div>
            <h1>Trainings</h1>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(row) => row.id}
            />
        </div>
    );
}
export default Trainings;
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { Training } from '../types';
import { fetchTrainings } from '../services/api';
import { format } from 'date-fns';
import { Button } from '@mui/material';
import TrainingDialog from '../components/TrainingDialog';
import { addTraining, deleteTraining, fetchCustomers } from '../services/api';
import type { Customer } from '../types';

function Trainings() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(error => console.error('Error fetching trainings:', error));

        fetchCustomers()
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
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
                if (value && value.firstname && value.lastname) {
                    return `${value.firstname} ${value.lastname}`;
                }
                return 'N/A';
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params: any) => (
                <Button size="small" color="error" onClick={() => handleDelete(params.row)}>Delete</Button>
            ),
        },
    ];

    const handleAddClick = () => {
        setDialogOpen(true);
    };

    const handleDelete = (training: Training) => {
        if (window.confirm(`Delete ${training.activity} training?`)) {
            deleteTraining(training.id)
                .then(() => {
                    setTrainings(trainings.filter(t => t.id !== training.id));
                })
                .catch(error => console.error('Error deleting training:', error));
        }
    };

    const handleSave = (trainingData: { date: string; duration: number; activity: string; customer: string }) => {
        addTraining(trainingData)
            .then(() => {
                fetchTrainings().then(data => setTrainings(data));
            })
            .catch(error => console.error('Error adding training:', error));
    };

    return (
        <div style={{ color: '#D1F0FD' }}>
            <h1>Trainings</h1>
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
                Add Training
            </Button>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(row) => row.id}
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
            <TrainingDialog
                open={dialogOpen}
                customers={customers}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
}
export default Trainings;
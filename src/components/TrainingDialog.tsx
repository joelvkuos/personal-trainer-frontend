import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import type { Customer } from '../types';

interface TrainingDialogProps {
    open: boolean;
    customers: Customer[];
    onClose: () => void;
    onSave: (training: { date: string; duration: number; activity: string; customer: string }) => void;
}

function TrainingDialog({ open, customers, onClose, onSave }: TrainingDialogProps) {
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [duration, setDuration] = useState('');
    const [activity, setActivity] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');

    useEffect(() => {
        if (!open) {
            setDate(dayjs());
            setDuration('');
            setActivity('');
            setSelectedCustomer('');
        }
    }, [open]);

    const handleSubmit = () => {
        if (date && duration && activity && selectedCustomer) {
            onSave({
                date: date.toISOString(),
                duration: Number(duration),
                activity,
                customer: selectedCustomer,
            });
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Training</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Date and Time"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        sx={{ width: '100%', marginTop: '8px' }}
                    />
                </LocalizationProvider>
                <TextField
                    margin="dense"
                    label="Duration (minutes)"
                    type="number"
                    fullWidth
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Activity"
                    fullWidth
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Customer"
                    select
                    fullWidth
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                    {customers.map((customer) => (
                        <MenuItem key={customer.email} value={customer._links?.self.href || ''}>
                            {customer.firstname} {customer.lastname}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TrainingDialog;
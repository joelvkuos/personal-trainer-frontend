import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { Customer } from '../types';

interface CustomerDialogProps {
    open: boolean;
    customer: Customer | null;
    onClose: () => void;
    onSave: (customer: Omit<Customer, '_links'>) => void;
}

function CustomerDialog({ open, customer, onClose, onSave }: CustomerDialogProps) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                firstname: customer.firstname,
                lastname: customer.lastname,
                streetaddress: customer.streetaddress,
                postcode: customer.postcode,
                city: customer.city,
                email: customer.email,
                phone: customer.email,
            });
        } else {
            setFormData({
                firstname: '',
                lastname: '',
                streetaddress: '',
                postcode: '',
                city: '',
                email: '',
                phone: '',
            });
        }
    }, [customer, open]);

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{customer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="First Name"
                    fullWidth
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    fullWidth
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Phone"
                    fullWidth
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Street Address"
                    fullWidth
                    value={formData.streetaddress}
                    onChange={(e) => setFormData({ ...formData, streetaddress: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Postcode"
                    fullWidth
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="City"
                    fullWidth
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomerDialog;
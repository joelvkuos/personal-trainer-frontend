import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#67645E' }}>
            <Toolbar>
                <Button
                    variant="outlined"
                    sx={{
                        color: '#D1F0FD',
                        borderColor: '#D1F0FD',
                        '&:hover': {
                            borderColor: '#D1F0FD',
                            backgroundColor: 'rgba(209, 240, 253, 0.1)'
                        }
                    }}
                    component={Link}
                    to="/"
                >
                    Customers
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        color: '#D1F0FD',
                        borderColor: '#D1F0FD',
                        marginLeft: '1rem',
                        '&:hover': {
                            borderColor: '#D1F0FD',
                            backgroundColor: 'rgba(209, 240, 253, 0.1)'
                        }
                    }}
                    component={Link}
                    to="/trainings"
                >
                    Trainings
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        color: '#D1F0FD',
                        borderColor: '#D1F0FD',
                        marginLeft: '1rem',
                        '&:hover': {
                            borderColor: '#D1F0FD',
                            backgroundColor: 'rgba(209, 240, 253, 0.1)'
                        }
                    }}
                    component={Link}
                    to="/calendar"
                >
                    Calendar
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        color: '#D1F0FD',
                        borderColor: '#D1F0FD',
                        marginLeft: '1rem',
                        '&:hover': {
                            borderColor: '#D1F0FD',
                            backgroundColor: 'rgba(209, 240, 253, 0.1)'
                        }
                    }}
                    component={Link}
                    to="/statistics"
                >
                    Statistics
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
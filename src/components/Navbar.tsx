import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    Customers
                </Button>
                <Button color="inherit" component={Link} to="/trainings">
                    Trainings
                </Button>
                <Button color="inherit" component={Link} to="/calendar">
                    Calendar
                </Button>
                <Button color="inherit" component={Link} to="/statistics">
                    Statistics
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
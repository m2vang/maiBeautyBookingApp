import React from 'react';
import Button from '@material-ui/core/Button';
import '../TechsUsedForProject/TechsUsedForProject.css';

function TechCard() {
    return (
        <div>
            <Button variant="contained">
                React JS
            </Button>
            <br />
            <Button variant="contained">
                Node JS
            </Button>
            <br />
            <Button variant="contained">
                Express
            </Button>
            <br />
            <Button variant="contained">
                Redux Saga
            </Button>
            <br />
            <Button variant="contained">
                PostgreSQL
            </Button>
            <br />
            <Button variant="contained">
                Material UI
            </Button>
            <br />
            <Button variant="contained">
                CSS
            </Button>
            <br />
            <Button variant="contained">
                Passport
            </Button>
            <br />
            <Button variant="contained">
                Moment.js
            </Button>
            <br />
            <Button variant="contained">
                Sweet Alerts
            </Button>
            <br />
            <Button variant="contained">
                React-Big-Calendar
            </Button>
            <br />
        </div>
    );
}

export default TechCard;
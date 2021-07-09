import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const PageNotFound = () => {
    return (
        <>
            <h1 style={{ color: "#FFFF00", marginLeft: '20px' }}>404 Page not found...</h1>
            <Link to='/'>
                <Button color="info" style={{ marginLeft: '20px', marginBottom: '200px' }}>
                    Go to the main page
                </Button>
            </Link>
        </>
    )
}

export default PageNotFound;
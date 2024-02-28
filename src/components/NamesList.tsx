import { useState } from 'react';
import Button from '@mui/material/Button';

function NamesList() {
    const [namesList, setNamesList] = useState([]);

    return (
        <Button variant="contained">Import a name list</Button>
    );
}

export default NamesList;

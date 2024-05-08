import { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import VisuallyHiddenInput from '../components/VisuallyHiddenInput';

interface calling {
    name: string;
}

function CallingsList() {
    const [callingsList, setCallingsList] = useState<calling[]>();
    const [error, setError] = useState<string>();

    const buttonClickHandler = (changeEvent) => {
        const file = changeEvent?.target?.files?.[0];
    
        if (!file) {
            setError('Error: File could not be loaded.');
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        
        fileReader.onload = () => {
            const list = JSON.parse(fileReader.result as string);
            setCallingsList(list);
        };
    };
    
    return (
        <div>
            <Button component="label" variant="contained" onChange={buttonClickHandler} startIcon={<CloudUploadIcon />} sx={{ textAlign: 'left'}}>Import callings list<VisuallyHiddenInput type="file" /></Button>
            {!error && callingsList && callingsList.map((calling) => (
                <Typography sx={{ mt: 2, mb: 2, fontSize: 24 }} variant="h1" component="div">
                    {calling?.name}
                </Typography>
            ))}
        </div>
    );
}

export default CallingsList;
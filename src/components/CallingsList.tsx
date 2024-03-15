import { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from '../components/VisuallyHiddenInput';

function CallingsList() {
    const [callingsList, setCallingsList] = useState<Array>();
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
            const list = JSON.parse(fileReader.result);
            setCallingsList(list);
        };
    };
    
    return (
        <div>
            <Button component="label" variant="contained" onChange={buttonClickHandler} startIcon={<CloudUploadIcon />} sx={{ textAlign: 'left'}}>Import callings list<VisuallyHiddenInput type="file" /></Button>
        </div>
    );
}

export default CallingsList;
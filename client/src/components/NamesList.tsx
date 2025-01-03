import { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import VisuallyHiddenInput from '../components/VisuallyHiddenInput';

interface name {
    uuid: string;
    name: string;
    surname: string;
}

interface household {
    uuid: string;
    name: string;
    surname: string;
    members: name[];
}

function NamesList() {
    // TODO: Set up importing name list from LDS site.
    const [namesList, setNamesList] = useState<name[]>();
    const [error, setError] = useState<string>();

    const flattenListToIndividuals = (list: Array<household>) => {
        const result: name[] = [];
        list?.forEach((household: household) => {
            result.push(...household.members);
        });
        return result;
    };

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
            const flattenedList = list ? flattenListToIndividuals(list) : [];
            setNamesList(flattenedList);
        };
    };

    const filteredNameList = (filterChar: string) => {
        return namesList?.filter((member: name)=> member?.surname?.charAt(0) === filterChar.toUpperCase()) || [];
    };

    const getPositions = (member) => {
        if (member.positions && member.positions.length > 0) {
            return member.positions;
        }
    }

    const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97).toUpperCase());

    return (
        <div>
            { !namesList && error && (
                <Alert severity="error">{error}</Alert>
            )}
            <Button component="label" variant="contained" onChange={buttonClickHandler} startIcon={<CloudUploadIcon />}>Import Names list<VisuallyHiddenInput type="file" /></Button>
            <Typography sx={{ mt: 2, mb: 2, fontSize: 24 }} variant="h1" component="div">
                Names List
            </Typography>
            <List 
                dense={false}
                sx={{
                    width: '100%',
                    // maxWidth: 360,
                    color: 'white',
                    // bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 800,
                    '& ul': { padding: 0 },
                    padding: 0,
                }} >
                {alphabet.map((sectionLetter) => (
                    <li key={`section-${sectionLetter}`}>
                    <ul>
                        <ListSubheader>{`${sectionLetter}`}</ListSubheader>
                        {filteredNameList(sectionLetter) && filteredNameList(sectionLetter).map((member) => (
                        <ListItem key={`item-${sectionLetter}-${member.uuid}`}>
                            <ListItemAvatar>
                                <Avatar></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                disableTypography
                                sx={{
                                    color: 'white'
                                }}>
                                    <Typography sx={{ fontSize: 18 }} variant="h2" component="div">
                                        {member?.name}
                                    </Typography>
                                    <List>
                                        {getPositions(member)?.map((position) => (
                                            <ListItem key={`item-${position?.uuid}`} sx={{ marginBottom: 1, marginTop: 1, padding: 0, fontSize: 12 }}>
                                                 {position?.positionTypeName} ({position?.unitName})
                                            </ListItem>
                                        ))}
                                    </List>
                            </ListItemText>
                        </ListItem>
                        ))}
                    </ul>
                    </li>
                ))}
            </List>
        </div>
    );
}

export default NamesList;

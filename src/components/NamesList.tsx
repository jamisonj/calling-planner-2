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
import { styled } from '@mui/material/styles';

function NamesList() {
    // TODO: Set up importing name list from LDS site.
    const [namesList, setNamesList] = useState<Array>();
    const [error, setError] = useState<string>();

    const flattenListToIndividuals = (list: Array<object>) => {
        const result = [];
        list?.forEach((household) => {
            result.push(...household.members);
        });
        return result;
    };

    const buttonClickHandler = (changeEvent) => {
        if (changeEvent?.target?.files) {
            const fileReader = new FileReader();
            fileReader.readAsText(changeEvent.target.files[0], "UTF-8");
            fileReader.onload = (fileReaderEvent: ProgressEvent) => {
                if (fileReaderEvent?.target?.result) {
                    const list = JSON.parse(fileReaderEvent.target.result);
                    const flattenedList = list ? flattenListToIndividuals(list) : [];
                    setNamesList(flattenedList);
                }
            };
        } else {
            setError('Error: File could not be loaded.');
        }
    };

    const filteredNameList = (filterChar: string) => {
        return namesList?.filter((member: object)=> member?.surname?.charAt(0) === filterChar.toUpperCase());
    };

    const getPositionsAsString = (member) => {
        if (member.positions && member.positions.length > 0) {
            return member.positions.map(position => position.positionTypeName).join(', ');
        }
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97).toUpperCase());

    console.log('namesList', namesList);

    return (
        <section>
            { !namesList && error && (
                <Alert severity="error">{error}</Alert>
            )}
            <Button component="label" variant="contained" onChange={buttonClickHandler} startIcon={<CloudUploadIcon />}>Import ward member list<VisuallyHiddenInput type="file" /></Button>
            <Typography sx={{ mt: 2, mb: 2, fontSize: 36 }} variant="h1" component="div">
                Ward Member List
            </Typography>
            <Typography sx={{ mt: 2, mb: 2, fontSize: 18 }} variant="h2" component="div">
                Fort Herriman SA Ward
            </Typography>
            <List 
                dense={false}
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    color: 'white',
                    // bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                }} >
                {alphabet.map((sectionId) => (
                        <li key={`section-${sectionId}`}>
                        <ul>
                            <ListSubheader>{`${sectionId}`}</ListSubheader>
                            {filteredNameList(sectionId) && filteredNameList(sectionId).map((member) => (
                            <ListItem key={`item-${sectionId}-${member.uuid}`}>
                                <ListItemAvatar>
                                    <Avatar></Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${member?.name}`}
                                    secondary={getPositionsAsString(member)}
                                    sx={{
                                        color: 'white'
                                    }}
                                />
                            </ListItem>
                            ))}
                        </ul>
                        </li>
                    ))}
            </List>
        </section>
    );
}

export default NamesList;

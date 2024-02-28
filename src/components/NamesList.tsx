import { useState, cloneElement } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

function NamesList() {
    // TODO: Set up importing name list from LDS site.
    const [namesList, setNamesList] = useState([]);

    return (
        <section>
            <Button variant="contained">Import ward member list</Button>
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
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                }} >
                {[0, 1, 2, 3, 4].map((sectionId) => (
                        <li key={`section-${sectionId}`}>
                        <ul>
                            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                            {[0, 1, 2].map((item) => (
                            <ListItem key={`item-${sectionId}-${item}`}>
                                <ListItemAvatar>
                                    <Avatar></Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`Item ${item}`}
                                    secondary="Secondary text"
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

import { useState, cloneElement } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      cloneElement(element, {
        key: value,
      }),
    );
  }

function NamesList() {
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
            <List dense={false}>
            {generate(
                <ListItem>
                <ListItemAvatar>
                    <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Single-line item"
                    secondary="Secondary text"
                />
                </ListItem>,
            )}
            </List>
        </section>
    );
}

export default NamesList;

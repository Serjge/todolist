import Box from '@material-ui/core/Box';
import * as React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export default function ButtonAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" style={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
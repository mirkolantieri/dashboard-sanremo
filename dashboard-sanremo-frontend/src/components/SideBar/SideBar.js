import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250,
        minWidth: 250,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '5px -2px 24px -11px rgba(46,46,46,0.79)',
        zIndex: 2
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
        width: '-webkit-fill-available;'
    }
}));

/**
 * Code for rendering the left side navigation bar.
 * @class SideBar
 */
export default function SideBar() {
    const classes = useStyles();

    const [year, setYear] = useState("");

    const handleChange = (event) => {
        setYear(event.target.value);
    };


    /**
     * Function that fills years (from 1951 up to now) into select input.
     * @function years
     */
    function years() {
        const currentYear = new Date().getFullYear();
        const firstEdition = 1951;
        const years = Array.from(new Array(currentYear - firstEdition + 1), (x, i) => i + firstEdition);
        let elements = [];
        years.map((y) => {
            elements.push(
                <MenuItem key={y} value={"" + y}>
                    <Link className={classes.link} to={"/" + y}>
                        {"" + y}
                    </Link>
                </MenuItem>)
            return null;
        });
        return elements.reverse();
    }

    // Render
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main year">
                <ListItem>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Anno</InputLabel>
                        <Select
                            value={year}
                            onChange={handleChange}
                        >
                            {years()}
                        </Select>
                    </FormControl>
                </ListItem>

                <Divider />

                <ListItem button onClick={() => window.location.href="/twitter/"+year}>
                    <ListItemIcon>
                        <TwitterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                </ListItem>
                <ListItem button onClick={()=>window.location.href='/youtube/'+ year}>
                <ListItemIcon>
                    <YouTubeIcon />
                </ListItemIcon>
                    <ListItemText primary="YouTube" />
                </ListItem>
            </List>
        </div>
    );
}
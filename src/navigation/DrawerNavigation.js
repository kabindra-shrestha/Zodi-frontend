import React from 'react';
import {Link} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider";
import {routeConstants} from "../_constants";
import {AddCircleOutline, ExpandLess, ExpandMore, HelpOutline} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function DrawerNavigation() {
    const classes = useStyles();
    const [isQuestionOpen, setIsQuestionOpen] = React.useState(false);

    const handleClick = () => {
        setIsQuestionOpen(!isQuestionOpen);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar/>
            <div className={classes.drawerContainer}>
                <List>
                    <ListItem button key={routeConstants.SITE} component={Link}
                              to={routeConstants.SITE_URL}>
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <ListItemText primary={routeConstants.SITE}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key={routeConstants.HOME} component={Link}
                              to={routeConstants.HOME_URL}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={routeConstants.HOME}/>
                    </ListItem>
                    <ListItem button key={routeConstants.DASHBOARD} component={Link}
                              to={routeConstants.DASHBOARD_URL}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={routeConstants.DASHBOARD}/>
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <HelpOutline/>
                        </ListItemIcon>
                        <ListItemText primary={routeConstants.QUESTION}/>
                        {isQuestionOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={isQuestionOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button key={routeConstants.QUESTION_CREATE} component={Link}
                                      to={routeConstants.QUESTION_CREATE_URL}
                                      className={classes.nested}>
                                <ListItemIcon>
                                    <AddCircleOutline/>
                                </ListItemIcon>
                                <ListItemText primary={routeConstants.QUESTION_CREATE}/>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        </Drawer>
    );
}
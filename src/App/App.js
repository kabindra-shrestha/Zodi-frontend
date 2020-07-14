import React, {Component} from 'react';
import {Link, Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {Login} from "../login/Login";
import {Dashboard} from "../dashboard/Dashboard";
import {PrivateRoute} from "../_components";
import Welcome from "../main/Welcome";
import './App.css';
import ErrorPageNotFound from "../error/ErrorPageNotFound";
import {Alert} from '@material-ui/lab';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider";
import {withStyles} from "@material-ui/core";
import {routeConstants} from "../_constants";

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

let TITLE;

class App extends Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;

        if (history.location.pathname === routeConstants.SITE_URL) {
            TITLE = routeConstants.SITE;
        }
        if (history.location.pathname === routeConstants.LOGIN_URL) {
            TITLE = routeConstants.LOGIN;
        }
        if (history.location.pathname === routeConstants.HOME_URL) {
            TITLE = routeConstants.HOME;
        }
        if (history.location.pathname === routeConstants.DASHBOARD_URL) {
            TITLE = routeConstants.DASHBOARD;
        }

        history.listen((location, action) => {
            if (history.location.pathname === routeConstants.SITE_URL) {
                TITLE = routeConstants.SITE;
            }
            if (history.location.pathname === routeConstants.LOGIN_URL) {
                TITLE = routeConstants.LOGIN;
            }
            if (history.location.pathname === routeConstants.HOME_URL) {
                TITLE = routeConstants.HOME;
            }
            if (history.location.pathname === routeConstants.DASHBOARD_URL) {
                TITLE = routeConstants.DASHBOARD;
            }

            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {classes} = this.props;

        const {alert, user} = this.props;
        const heading = "Welcome To Zodi";
        const quote = "This project includes simple spring boot application with spring security and react js as frontend for authentication with JWT.";
        const footer = "Kabindra Shrestha";

        return (
            <div>
                {alert.message &&
                <Alert severity="error">{alert.message}</Alert>
                }
                <Router history={history}>
                    <div className={classes.root}>
                        <CssBaseline/>
                        {TITLE !== routeConstants.SITE && <div>
                            {user &&
                            <AppBar position="fixed" className={classes.appBar}>
                                <Toolbar>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit"
                                                aria-label="menu">
                                        <img src="/favicon.ico" width="25" height="25" alt="brand"/>
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title} noWrap>
                                        {TITLE}
                                    </Typography>
                                    <Button color="inherit" href={routeConstants.LOGIN_URL}>Logout</Button>
                                </Toolbar>
                            </AppBar>}
                            {user &&
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
                                        <ListItem button key={routeConstants.LOGIN} component={Link}
                                                  to={routeConstants.LOGIN_URL}>
                                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                            <ListItemText primary={routeConstants.LOGIN}/>
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
                                    </List>
                                </div>
                            </Drawer>}
                        </div>}
                        <main className={classes.content}>
                            {TITLE !== routeConstants.SITE && <div>{user && <Toolbar/>}</div>}
                            <Switch className="padding-left">
                                <Route path={routeConstants.SITE_URL} exact
                                       component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                                <Route path={routeConstants.LOGIN_URL} exact component={Login}/>
                                <PrivateRoute path={routeConstants.HOME_URL} exact component={() => <Dashboard/>}/>
                                <PrivateRoute path={routeConstants.DASHBOARD_URL} exact component={() => <Dashboard/>}/>
                                <Route component={() => <ErrorPageNotFound/>}/>
                            </Switch>
                        </main>
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert, authentication} = state;
    const {user} = authentication;
    return {
        alert,
        user
    };
}

const connectedApp = withStyles(useStyles, {withTheme: true})(connect(mapStateToProps)(App));
export {connectedApp as App};
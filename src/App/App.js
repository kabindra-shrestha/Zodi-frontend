import React, {Component} from 'react';
import {Link, Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {Login} from "../login/Login";
import {Dashboard} from "../dashboard/Dashboard";
import {Profile} from "../profile/Profile";
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
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
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
import {green, red} from "@material-ui/core/colors";

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
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
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
    }, customBadgeSuccess: {
        backgroundColor: green.A400,
        color: "white"
    }, customBadgeError: {
        backgroundColor: red.A400,
        color: "white"
    },
});

let TITLE;

function setTitle(history) {
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
    if (history.location.pathname === routeConstants.PROFILE_URL) {
        TITLE = routeConstants.PROFILE;
    }
}

class App extends Component {

    profileMoreAnchorEl;
    mobileMoreAnchorEl;

    constructor(props) {
        super(props);

        const {dispatch} = this.props;

        setTitle(history);

        history.listen((location, action) => {
            setTitle(history);

            // clear alert on location change
            dispatch(alertActions.clear());
        });

        this.state = {
            profileMoreAnchorEl: null,
            mobileMoreAnchorEl: null,
        };

        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
        this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
        this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
    }

    setProfileMoreAnchorEl(currentTarget) {
        this.setState({profileMoreAnchorEl: currentTarget});
    }

    setMobileMoreAnchorEl(currentTarget) {
        this.setState({mobileMoreAnchorEl: currentTarget});
    }

    handleProfileMenuOpen = (event) => {
        event.preventDefault();

        this.setProfileMoreAnchorEl(event.currentTarget);
    };

    handleMobileMenuOpen = (event) => {
        event.preventDefault();

        this.setMobileMoreAnchorEl(event.currentTarget);
    };

    handleMobileMenuClose = () => {
        this.setMobileMoreAnchorEl(null);
    };

    handleProfileMenuClose = () => {
        this.setProfileMoreAnchorEl(null);
        this.handleMobileMenuClose();
    };

    render() {
        const userData = JSON.parse(localStorage.getItem('user'));

        const {classes} = this.props;

        const {alert, loggedIn, user} = this.props;
        const heading = "Welcome To Zodi";
        const quote = "This project includes simple spring boot application with spring security and react js as frontend for authentication with JWT.";
        const footer = "Kabindra Shrestha";

        const isMenuOpen = Boolean(this.state.profileMoreAnchorEl);
        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={this.state.profileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={this.handleProfileMenuClose}
            >
                <MenuItem onClick={this.handleProfileMenuClose} component={Link}
                          to={routeConstants.PROFILE_URL}>Profile</MenuItem>
                <MenuItem onClick={this.handleProfileMenuClose} component={Link}
                          to={routeConstants.LOGIN_URL}>Logout</MenuItem>
            </Menu>
        );

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        {userData ?
                            <Badge
                                classes={{badge: user.access_token ? classes.customBadgeSuccess : classes.customBadgeError}}
                                variant="dot">
                                <AccountCircle/>
                            </Badge>
                            :
                            <AccountCircle/>
                        }
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div>
                {alert.message &&
                <Alert severity="error">{alert.message}</Alert>
                }
                <Router history={history}>
                    <div className={classes.root}>
                        <CssBaseline/>
                        {TITLE !== routeConstants.SITE && <div>
                            {loggedIn &&
                            <AppBar position="fixed" className={classes.appBar}>
                                <Toolbar>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit"
                                                aria-label="menu">
                                        <img src="/favicon.ico" width="25" height="25" alt="brand"/>
                                    </IconButton>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        {TITLE}
                                    </Typography>
                                    <div className={classes.root}/>
                                    <div className={classes.sectionDesktop}>
                                        <IconButton
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            onClick={this.handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            {userData ?
                                                <Badge
                                                    classes={{badge: user.access_token ? classes.customBadgeSuccess : classes.customBadgeError}}
                                                    variant="dot">
                                                    <AccountCircle/>
                                                </Badge>
                                                :
                                                <AccountCircle/>
                                            }
                                        </IconButton>
                                    </div>
                                    <div className={classes.sectionMobile}>
                                        <IconButton
                                            aria-label="show more"
                                            aria-controls={mobileMenuId}
                                            aria-haspopup="true"
                                            onClick={this.handleMobileMenuOpen}
                                            color="inherit"
                                        >
                                            <MoreIcon/>
                                        </IconButton>
                                    </div>
                                </Toolbar>
                            </AppBar>}
                            {renderMobileMenu}
                            {renderMenu}
                            {loggedIn &&
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
                                    </List>
                                </div>
                            </Drawer>}
                        </div>}
                        <main className={classes.content}>
                            {TITLE !== routeConstants.SITE && <div>{loggedIn && <Toolbar/>}</div>}
                            <Switch className="padding-left">
                                <Route path={routeConstants.SITE_URL} exact
                                       component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                                <Route path={routeConstants.LOGIN_URL} exact component={Login}/>
                                <PrivateRoute path={routeConstants.HOME_URL} exact component={() => <Dashboard/>}/>
                                <PrivateRoute path={routeConstants.DASHBOARD_URL} exact component={() => <Dashboard/>}/>
                                <PrivateRoute path={routeConstants.PROFILE_URL} exact component={() => <Profile/>}/>
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
    const {loggedIn, user} = authentication;
    return {
        alert,
        loggedIn,
        user
    };
}

const connectedApp = withStyles(useStyles, {withTheme: true})(connect(mapStateToProps)(App));
export {connectedApp as App};
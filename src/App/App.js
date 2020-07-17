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
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
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
import {fade, withStyles} from "@material-ui/core";
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
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
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
}

class App extends Component {
    anchorEl;
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
            anchorEl: null,
            mobileMoreAnchorEl: null,
        };

        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
    }

    setAnchorEl(currentTarget) {
        this.setState({anchorEl: currentTarget});
    }

    setMobileMoreAnchorEl(currentTarget) {
        this.setState({mobileMoreAnchorEl: currentTarget});
    }

    handleProfileMenuOpen = (event) => {
        console.error("handleProfileMenuOpen " + event.currentTarget);
        this.setAnchorEl(event.currentTarget);
    };

    render() {
        const {classes} = this.props;

        const {alert, loggedIn} = this.props;
        const heading = "Welcome To Zodi";
        const quote = "This project includes simple spring boot application with spring security and react js as frontend for authentication with JWT.";
        const footer = "Kabindra Shrestha";

        // const [anchorEl, setAnchorEl] = React.useState(null);
        // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

        const isMenuOpen = Boolean(this.anchorEl);
        const isMobileMenuOpen = Boolean(this.mobileMoreAnchorEl);

        const handleMobileMenuClose = () => {
            console.error("handleMobileMenuClose null");
            this.setMobileMoreAnchorEl(null);
        };

        const handleMenuClose = () => {
            console.error("handleMenuClose null");
            this.setAnchorEl(null);
            handleMobileMenuClose();
        };

        const handleMobileMenuOpen = (event) => {
            console.error("handleMobileMenuOpen " + event.currentTarget);
            this.setMobileMoreAnchorEl(event.currentTarget);
        };

        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={this.anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            </Menu>
        );

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                anchorEl={this.mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
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
                        <AccountCircle/>
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
                            {/*{loggedIn &&
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
                            </AppBar>}*/}
                            {loggedIn &&
                            <AppBar position="fixed" className={classes.appBar}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        className={classes.menuButton}
                                        color="inherit"
                                        aria-label="open drawer"
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        {TITLE}
                                    </Typography>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon/>
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{'aria-label': 'search'}}
                                        />
                                    </div>
                                    <div className={classes.grow}/>
                                    <div className={classes.sectionDesktop}>
                                        <IconButton aria-label="show 4 new mails" color="inherit">
                                            <Badge badgeContent={4} color="secondary">
                                                <MailIcon/>
                                            </Badge>
                                        </IconButton>
                                        <IconButton aria-label="show 17 new notifications" color="inherit">
                                            <Badge badgeContent={17} color="secondary">
                                                <NotificationsIcon/>
                                            </Badge>
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            onClick={this.handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            <AccountCircle/>
                                        </IconButton>
                                    </div>
                                    <div className={classes.sectionMobile}>
                                        <IconButton
                                            aria-label="show more"
                                            aria-controls={mobileMenuId}
                                            aria-haspopup="true"
                                            onClick={handleMobileMenuOpen}
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
                            {TITLE !== routeConstants.SITE && <div>{loggedIn && <Toolbar/>}</div>}
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
    const {loggedIn} = authentication;
    return {
        alert,
        loggedIn
    };
}

const connectedApp = withStyles(useStyles, {withTheme: true})(connect(mapStateToProps)(App));
export {connectedApp as App};
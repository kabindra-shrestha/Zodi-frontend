import React from 'react';
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import {routeConstants} from "../_constants";
import {makeStyles} from "@material-ui/core/styles";
import {green, red} from "@material-ui/core/colors";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
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
    customBadgeSuccess: {
        backgroundColor: green.A400,
        color: "white"
    }, customBadgeError: {
        backgroundColor: red.A400,
        color: "white"
    },
}));

export default function AppBarNavigation({title}) {
    const classes = useStyles();

    const userData = JSON.parse(localStorage.getItem('user'));

    const [profileMoreAnchorEl, setProfileMoreAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(profileMoreAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        event.preventDefault();

        setProfileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        event.preventDefault();

        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleProfileMenuClose = () => {
        setProfileMoreAnchorEl(null);
        handleMobileMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={profileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuClose} component={Link}
                      to={routeConstants.PROFILE_URL}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose} component={Link}
                      to={routeConstants.LOGIN_URL}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {userData ?
                        <Badge
                            classes={{badge: userData.access_token ? classes.customBadgeSuccess : classes.customBadgeError}}
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
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit"
                                aria-label="menu">
                        <img src="/favicon.ico" width="25" height="25" alt="brand"/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {title}
                    </Typography>
                    <div className={classes.root}/>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {userData ?
                                <Badge
                                    classes={{badge: userData.access_token ? classes.customBadgeSuccess : classes.customBadgeError}}
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
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
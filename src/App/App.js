import React, {Component} from 'react';
import {Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {Login} from "../login/Login";
import {Dashboard} from "../dashboard/Dashboard";
import {QuestionCreate} from "../question/create/QuestionCreate";
import {Profile} from "../profile/Profile";
import {PrivateRoute} from "../_components";
import Welcome from "../main/Welcome";
import ErrorPageNotFound from "../error/ErrorPageNotFound";
import {Alert} from '@material-ui/lab';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import {withStyles} from "@material-ui/core";
import {routeConstants} from "../_constants";
import DrawerNavigation from "../navigation/DrawerNavigation";
import AppBarNavigation from "../navigation/AppBarNavigation";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
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
    if (history.location.pathname === routeConstants.PROFILE_URL) {
        TITLE = routeConstants.PROFILE;
    }
    if (history.location.pathname === routeConstants.QUESTION_CREATE_URL) {
        TITLE = routeConstants.QUESTION + " " + routeConstants.QUESTION_CREATE;
    }
}

class App extends Component {

    constructor(props) {
        super(props);

        const {dispatch} = this.props;

        setTitle(history);

        history.listen((location, action) => {
            setTitle(history);

            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {classes} = this.props;

        const {alert, loggedIn} = this.props;
        const heading = "Welcome To Kalon";
        const quote = "This project includes simple spring boot application with spring security and react js as frontend for authentication with JWT.";
        const footer = "Kabindra Shrestha";

        return (
            <div>
                <Router history={history}>
                    <div className={classes.root}>
                        <CssBaseline/>
                        {TITLE !== routeConstants.SITE && <div>
                            {loggedIn && <AppBarNavigation title={TITLE}/>}
                            {loggedIn && <DrawerNavigation/>}
                        </div>}
                        <main className={classes.content}>
                            {TITLE !== routeConstants.SITE && <div>{loggedIn && <Toolbar/>}</div>}
                            {alert.message &&
                            <Alert severity={alert.type}>{alert.message}</Alert>
                            }
                            <Switch className="padding-left">
                                <Route path={routeConstants.SITE_URL} exact
                                       component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                                <Route path={routeConstants.LOGIN_URL} exact component={Login}/>
                                <PrivateRoute path={routeConstants.HOME_URL} exact component={() => <Dashboard/>}/>
                                <PrivateRoute path={routeConstants.DASHBOARD_URL} exact component={() => <Dashboard/>}/>
                                <PrivateRoute path={routeConstants.PROFILE_URL} exact component={() => <Profile/>}/>
                                <PrivateRoute path={routeConstants.QUESTION_CREATE_URL} exact
                                              component={() => <QuestionCreate/>}/>
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
    const {alert, login} = state;
    const {loggedIn, user} = login;
    return {
        alert,
        loggedIn,
        user
    };
}

const connectedApp = withStyles(useStyles, {withTheme: true})(connect(mapStateToProps)(App));
export {connectedApp as App};
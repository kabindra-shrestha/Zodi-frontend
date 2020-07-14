import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userActions} from '../_actions';
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card/Card";

const useStyles = theme => ({
    root: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative'
    },
    content: {
        padding: '4rem 2rem !important',
        backgroundColor: theme.palette.card.background,
        borderRadius: '.3rem'
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: 300,
        lineHeight: 1.2,
        marginBottom: '.5rem',
        marginTop: 0,
        display: 'block',
        marginBlockStart: '0.67em',
        marginBlockEnd: '0.67em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        color: theme.palette.text,
        textAlign: 'left'
    },
    quote: {
        fontSize: '1.25rem',
        fontWeight: 300,
        marginTop: 0,
        marginBottom: '1rem',
        display: 'block',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        lineHeight: 1.5,
        color: theme.palette.text,
        textAlign: 'left'
    },
    footer: {
        marginTop: 0,
        marginBottom: '1rem',
        display: 'block',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        color: theme.palette.text,
        textAlign: 'left'
    },
    space: {
        marginBottom: '1.5rem!important',
        marginTop: '1.5rem!important',
        border: 0,
        borderTop: '1px solid rgba(0,0,0,.1)',
        boxSizing: 'content-box',
        height: 0,
    },
});

class Dashboard extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const {classes} = this.props;
        const {user, users, usersData} = this.props;

        return (<div>
                <div>
                    <Card className={classes.root}>
                        <CardContent className={classes.content}>
                            <Typography className={classes.title} gutterBottom>
                                <p>Hi {user.firstname + " " + user.lastname}! From Authentication Redux</p>
                            </Typography>
                            <Typography className={classes.title} gutterBottom>
                                {usersData &&
                                <p>Hi {usersData.firstname + " " + usersData.lastname}! From Users Redux</p>}
                            </Typography>
                            <Typography className={classes.quote}>
                                <p>You're logged in with React & JWT!!</p>
                            </Typography>
                            <hr className={classes.space}/>
                            <Typography className={classes.footer}>
                                {users.loading && <em>Loading users...</em>}
                                {users.error && <p className="text-danger">ERROR: {users.error}</p>}
                            </Typography>
                            <Typography className={classes.footer}>
                                {users.usersStatus &&
                                <p className="text-danger">STATUS: {users.usersStatus ? "True" : "False"}</p>}
                                {users.usersMessage &&
                                <p className="text-danger">MESSAGE: {users.usersMessage}</p>}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {users, authentication} = state;
    const {user} = authentication;
    const {usersData} = users;
    return {
        user,
        users,
        usersData
    };
}

const connectedDashboard = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(Dashboard)));
export {connectedDashboard as Dashboard};
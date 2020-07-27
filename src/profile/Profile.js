import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card/Card";
import {userActions} from "../_actions";

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

class Profile extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const {classes} = this.props;
        const {usersData} = this.props;

        return (<Card className={classes.root}>
            {usersData &&
            <CardContent className={classes.content}>
                <Typography className={classes.title} gutterBottom>
                    <p>{usersData.firstName + " " + usersData.lastName}</p>
                </Typography>
                <Typography className={classes.quote}>
                    <p>Name: {usersData.name}</p>
                    <p>Username: {usersData.username}</p>
                    <p>Email: {usersData.email}</p>
                    <p>Age: {usersData.age}</p>
                    <p>Gender: {usersData.gender}</p>
                    <p>Avatar: {usersData.avatar}</p>
                    <p>Current City: {usersData.currentCity}</p>
                    <p>School: {usersData.school}</p>
                    <p>Has Liked You: {usersData.hasLikedYou}</p>
                    <p>Kalon Points: {usersData.kalonPoints}</p>
                    <p>Looking For: {usersData.lookingFor}</p>
                    <p>Photos: {usersData.photos}</p>
                    <p>Profile Pic: {usersData.profilePic}</p>
                    <p>Status: {usersData.status}</p>
                    <p>Premium: {usersData.premium}</p>
                    <p>User Verified: {usersData.userVerified}</p>
                    <p>Email Verified: {usersData.emailVerified}</p>
                    <p>Verification Deadline: {usersData.verificationDeadline}</p>
                    <p>Profile Updated: {usersData.profileUpdated}</p>
                    <p>City Id: {usersData.cityId}</p>
                </Typography>
                <hr className={classes.space}/>
                <Typography className={classes.footer}>
                    {usersData.status &&
                    <p className="text-danger">STATUS: {usersData.status ? "Active" : "Inactive"}</p>}
                </Typography>
            </CardContent>
            }
        </Card>);
    }
}

function mapStateToProps(state) {
    const {users} = state;
    const {usersData} = users;
    return {
        usersData
    };
}

const connectedDashboard = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(Profile)));
export {connectedDashboard as Profile};
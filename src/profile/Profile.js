import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card/Card";
import {userActions} from "../_actions";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = theme => ({
    root: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative',
        display: 'flex'
    },
    content: {
        padding: '2rem 2rem !important',
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
    avatar: {
        margin: 'auto',
        height: 100,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    name: {
        textAlign: 'center',
        marginTop: '8px',
    },
    info: {
        textAlign: 'center',
        marginTop: '8px',
    },
});

class Profile extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const {classes} = this.props;
        const {usersData} = this.props;

        return (<div className={classes.root}>
            <Grid
                container
                spacing={4}>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={4}
                    xs={12}>
                    <Card>
                        {usersData &&
                        <CardContent className={classes.content}>
                            <Avatar className={classes.avatar} src={usersData.avatar}/>
                            <Typography className={classes.name} variant="h3" gutterBottom>
                                {usersData.firstName + " " + usersData.lastName}
                            </Typography>
                            <Typography className={classes.info} variant="body1" gutterBottom>
                                {usersData.address + " " + usersData.lastName}
                            </Typography>
                            <hr className={classes.space}/>
                            <Typography className={classes.footer}>
                                {/*{usersData.status &&*/}
                                STATUS: {usersData.status ? "Active" : "Inactive"}{/*}*/}
                            </Typography>
                        </CardContent>
                        }
                    </Card>
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={12}>
                    <Card>
                        {usersData &&
                        <CardContent className={classes.content}>
                            <Typography className={classes.name} variant="h3" gutterBottom>
                                {usersData.firstName + " " + usersData.lastName}
                            </Typography>
                            <Typography className={classes.quote}>
                                Name: {usersData.name}
                                Username: {usersData.username}
                                Email: {usersData.email}
                                Age: {usersData.age}
                                Gender: {usersData.gender}
                                Avatar: {usersData.avatar}
                                Current City: {usersData.currentCity}
                                School: {usersData.school}
                                Has Liked You: {usersData.hasLikedYou}
                                Kalon Points: {usersData.kalonPoints}
                                Looking For: {usersData.lookingFor}
                                Photos: {usersData.photos}
                                Profile Pic: {usersData.profilePic}
                                Status: {usersData.status}
                                Premium: {usersData.premium}
                                User Verified: {usersData.userVerified}
                                Email Verified: {usersData.emailVerified}
                                Verification Deadline: {usersData.verificationDeadline}
                                Profile Updated: {usersData.profileUpdated}
                                City Id: {usersData.cityId}
                            </Typography>
                            <hr className={classes.space}/>
                            <Typography className={classes.footer}>
                                {/*{usersData.status &&*/}
                                STATUS: {usersData.status ? "Active" : "Inactive"}{/*}*/}
                            </Typography>
                        </CardContent>
                        }
                    </Card>
                </Grid>
            </Grid>
        </div>);
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
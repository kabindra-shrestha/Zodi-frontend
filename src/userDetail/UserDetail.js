import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress, withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import {green, red, yellow} from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import {userDetailActions} from "../_actions/userDetail.actions";

const useStyles = theme => ({
    paper: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardBackground: {
        backgroundColor: theme.palette.card.background
    },
    content: {
        padding: '2rem 2rem !important',
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
    customBadgeUserVerified: {
        backgroundColor: green.A400,
        color: green.A400
    },
    customBadgeUserVerificationPending: {
        backgroundColor: yellow.A400,
        color: yellow.A400
    },
    customBadgeUserNotVerified: {
        backgroundColor: red.A400,
        color: red.A400
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

const StyledBadge = withStyles((theme) => ({
    badge: {
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
        margin: 'auto',
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

class UserDetail extends Component {

    constructor(props) {
        super(props);

        props.dispatch(userDetailActions.userDetail(props.match.params.username));
    }

    userVerificationStatus(userVerified, classes) {
        switch (userVerified) {
            case 1:
                return classes.customBadgeUserVerified;
            case 2:
                return classes.customBadgeUserVerificationPending;
            case 0:
                return classes.customBadgeUserNotVerified;
            default:
                return classes.customBadgeUserNotVerified;
        }
    }

    render() {
        const {classes} = this.props;
        const {userDetailData, fetching} = this.props;

        return (<div className={classes.paper}>
            {fetching &&
            <CircularProgress className={classes.spinner}/>
            }
            <Grid
                container
                spacing={4}>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={4}
                    xs={12}>
                    <Card className={classes.cardBackground}>
                        {userDetailData &&
                        <CardContent className={classes.content}>
                            <div className={classes.avatar}>
                                <StyledBadge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                    classes={{badge: this.userVerificationStatus(userDetailData.userVerified, classes)}}>
                                    <Avatar className={classes.avatar} src={userDetailData.avatar}/>
                                </StyledBadge>
                            </div>
                            <Typography className={classes.name} variant="h5" gutterBottom>
                                {userDetailData.firstName + " " + userDetailData.lastName}
                            </Typography>
                            <Typography className={classes.info} variant="body1" gutterBottom>
                                {userDetailData.email}
                            </Typography>
                            <Typography className={classes.info} variant="body2" gutterBottom>
                                {userDetailData.status}
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
                    {userDetailData &&
                    <Card
                        className={classes.cardBackground}>
                        <CardHeader title="User Detail"/>
                        <Divider/>
                        <CardContent className={classes.content}>
                            <Grid
                                container
                                spacing={3}>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        margin="dense"
                                        name="age"
                                        required
                                        value={userDetailData.age}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Avatar"
                                        margin="dense"
                                        name="avatar"
                                        required
                                        value={userDetailData.avatar}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="City Id"
                                        margin="dense"
                                        name="cityId"
                                        required
                                        value={userDetailData.cityId}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Current City"
                                        margin="dense"
                                        name="currentCity"
                                        required
                                        value={userDetailData.currentCity}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="DOB"
                                        margin="dense"
                                        name="dob"
                                        required
                                        value={userDetailData.dob}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        margin="dense"
                                        name="email"
                                        required
                                        value={userDetailData.email}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email Verified"
                                        margin="dense"
                                        name="emailVerified"
                                        required
                                        value={userDetailData.emailVerified}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        margin="dense"
                                        name="firstName"
                                        required
                                        value={userDetailData.firstName}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Gender"
                                        margin="dense"
                                        name="gender"
                                        required
                                        value={userDetailData.gender}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Has Liked You"
                                        margin="dense"
                                        name="hasLikedYou"
                                        required
                                        value={userDetailData.hasLikedYou}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Interests"
                                        margin="dense"
                                        name="interests"
                                        required
                                        value={userDetailData.interests}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        margin="dense"
                                        name="lastName"
                                        required
                                        value={userDetailData.lastName}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Looking For"
                                        margin="dense"
                                        name="lookingFor"
                                        required
                                        value={userDetailData.lookingFor}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        margin="dense"
                                        name="name"
                                        required
                                        value={userDetailData.name}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Photos"
                                        margin="dense"
                                        name="photos"
                                        required
                                        value={userDetailData.photos}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Premium"
                                        margin="dense"
                                        name="premium"
                                        required
                                        value={userDetailData.premium}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Profile Pic"
                                        margin="dense"
                                        name="profilePic"
                                        required
                                        value={userDetailData.profilePic}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Profile Updated"
                                        margin="dense"
                                        name="profileUpdated"
                                        required
                                        value={userDetailData.profileUpdated}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="School"
                                        margin="dense"
                                        name="school"
                                        required
                                        value={userDetailData.school}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Status"
                                        margin="dense"
                                        name="status"
                                        required
                                        value={userDetailData.status}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="User Verified"
                                        margin="dense"
                                        name="userVerified"
                                        required
                                        value={userDetailData.userVerified}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        margin="dense"
                                        name="username"
                                        required
                                        value={userDetailData.username}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Verification Deadline"
                                        margin="dense"
                                        name="verificationDeadline"
                                        required
                                        value={userDetailData.verificationDeadline}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                    {/*<TextField
                                        fullWidth
                                        label="Verification Id"
                                        margin="dense"
                                        name="verificationId"
                                        required
                                        value={userDetailData.verificationId}
                                        variant="outlined"
                                        disabled
                                    />*/}
                                    <img className={classes.img} alt="complex" src={userDetailData.verificationId} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    }
                </Grid>
            </Grid>
        </div>);
    }

}

function mapStateToProps(state) {
    const {userDetail} = state;
    const {userDetailData, fetching} = userDetail;
    return {
        userDetail,
        userDetailData,
        fetching
    };
}

const connectedUserDetailPage = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(UserDetail)));
export {connectedUserDetailPage as UserDetail};
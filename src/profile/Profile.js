import React, {Component} from 'react';
import {connect} from 'react-redux';
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

class Profile extends Component {

    render() {
        const {classes} = this.props;
        const {user} = this.props;

        return (<div>
                <div>
                    <Card className={classes.root}>
                        {user &&
                        <CardContent className={classes.content}>
                            <Typography className={classes.title} gutterBottom>
                                <p>{user.firstname + " " + user.lastname}</p>
                            </Typography>
                            <Typography className={classes.quote}>
                                <p>Email: {user.email}</p>
                                <p>Address: {user.address}</p>
                                <p>Phone No.: {user.phone}</p>
                                <p>Mobile No.: {user.mobile}</p>
                                <p>Image: {user.image}</p>
                                <p>Expiry Date: {user.expiryDate}</p>
                                <p>Created At: {user.createdat}</p>
                                <p>Modified At: {user.modifiedat}</p>
                            </Typography>
                            <hr className={classes.space}/>
                            <Typography className={classes.footer}>
                                {user.enabled &&
                                <p className="text-danger">STATUS: {user.enabled ? "Active" : "Inactive"}</p>}
                            </Typography>
                        </CardContent>
                        }
                    </Card>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {authentication} = state;
    const {user} = authentication;
    return {
        user,
    };
}

const connectedDashboard = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(Profile)));
export {connectedDashboard as Profile};
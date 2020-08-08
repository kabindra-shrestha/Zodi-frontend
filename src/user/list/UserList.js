import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userListActions} from '../../_actions';
import {Paper, withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import {green, red} from "@material-ui/core/colors";

const useStyles = theme => ({
    root: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative'
    },
    customBadgeSuccess: {
        backgroundColor: green.A400,
        color: "white"
    }, customBadgeError: {
        backgroundColor: red.A400,
        color: "white"
    },
});

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
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

class UserList extends Component {
    componentDidMount() {
        this.props.dispatch(userListActions.userList(0));
    }

    render() {
        const {classes} = this.props;
        const {userListData} = this.props;

        return (
            <div className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Avatar</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Current City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userListData && userListData.length > 0 ? userListData.map((userList) =>
                                <TableRow key={userList.username}>
                                    <TableCell component="th" scope="row">
                                        <StyledBadge
                                            overlap="circle"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            variant="dot"
                                            classes={{badge: userList.status ? classes.customBadgeSuccess : classes.customBadgeError}}>
                                            <Avatar src={userList.avatar}/>
                                        </StyledBadge>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {userList.firstName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {userList.lastName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {userList.username}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {userList.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {userList.email}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {userList.age}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {userList.gender}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {userList.currentCity}
                                    </TableCell>
                                </TableRow>
                            ) : <TableRow>
                                <TableCell colSpan={9} align="center">
                                    No Users Available
                                </TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {userList} = state;
    const {userListData} = userList;
    return {
        userList,
        userListData
    };
}

const connectedUserListPage = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(UserList)));
export {connectedUserListPage as UserList};
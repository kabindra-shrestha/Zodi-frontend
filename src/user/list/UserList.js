import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userListActions} from '../../_actions';
import {CircularProgress, Paper, withStyles} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import {green, red} from "@material-ui/core/colors";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import {routeConstants} from "../../_constants";
import IconButton from "@material-ui/core/IconButton";

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
    spinner: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
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

    constructor(props) {
        super(props);

        props.dispatch(userListActions.userList(0));

        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangePage = (event, newPage) => {
        this.props.dispatch(userListActions.userList(newPage));
    };

    render() {
        const {classes} = this.props;
        const {userList, userListData} = this.props;

        const column = 9;
        const count = (userListData && userListData.content.length > 0) && userListData.totalElements;
        const rowsPerPage = (userListData && userListData.content.length > 0) && userListData.size;
        const page = (userListData && userListData.content.length > 0) && userListData.number;

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
                            {userListData && userListData.content.length > 0 ? userListData.content.map((userListContent) =>
                                    <TableRow key={userListContent.username}>
                                        <TableCell component="th" scope="row">
                                            <IconButton
                                                edge="end"
                                                aria-label="avatar"
                                                color="inherit"
                                                component={Link}
                                                to={routeConstants.USER_DETAIL_URL + "/" + userListContent.username}>
                                                <StyledBadge
                                                    overlap="circle"
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    variant="dot"
                                                    classes={{badge: userListContent.status ? classes.customBadgeSuccess : classes.customBadgeError}}>
                                                    <Avatar src={userListContent.avatar}/>
                                                </StyledBadge>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {userListContent.firstName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {userListContent.lastName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {userListContent.username}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {userListContent.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {userListContent.email}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {userListContent.age}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {userListContent.gender}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {userListContent.currentCity}
                                        </TableCell>
                                    </TableRow>
                                ) :
                                userList.fetching ?
                                    <TableRow>
                                        <TableCell colSpan={column} align="center">
                                            <CircularProgress className={classes.spinner}/>
                                        </TableCell>
                                    </TableRow> :
                                    <TableRow>
                                        <TableCell colSpan={column} align="center">
                                            No Users Available
                                        </TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                        {(userListData && userListData.content.length > 0) &&
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[count]}
                                    colSpan={column}
                                    count={count}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {'aria-label': 'rows per page'},
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                />
                            </TableRow>
                        </TableFooter>
                        }
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
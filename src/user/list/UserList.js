import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userListActions} from '../../_actions';
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";

const useStyles = theme => ({
    root: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative'
    },
});

class UserList extends Component {
    componentDidMount() {
        this.props.dispatch(userListActions.userList(0));
    }

    render() {
        const {classes} = this.props;
        const {userListData} = this.props;

        return (
            <div className={classes.root}>
                {userListData && userListData.map((userList) => <li
                    key={userList.username}>{userList.username} </li>)}
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
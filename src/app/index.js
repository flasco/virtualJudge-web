import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './components/Nav';
import Routes from './Routes';

import { setMouse, userLogin, userLogout, setUserLoginBoard } from './actions'

class App extends React.Component {
  componentWillMount() {
    if (false) {
      console.log('cookie expired!');
      this.props.dispatch(userLogout());
    }
  }
  render() {
    const { dispatch, userBoardHover, isLogin, userLoginBoard, header } = this.props
    return (
      <Router>
        <Nav
          isLogin={isLogin}
          header={header}
          userBoardHover={userBoardHover}
          userLoginBoard={userLoginBoard}
          setUserLoginBoard={type => dispatch(setUserLoginBoard(type))}
          setMouse={type => dispatch(setMouse(type))}
          userLogin={info => dispatch(userLogin(info))}
          userLogout={type => dispatch(userLogout(type))}>
          {Routes}
        </Nav>
      </Router>
    );
  }
}

function select(state) {
  return {
    userBoardHover: state.mouse.userBoardHover,
    header: state.user.header,
    isLogin: state.user.isLogin,
    userLoginBoard: state.userLoginBoard,
  };
}

export default connect(select)(App);
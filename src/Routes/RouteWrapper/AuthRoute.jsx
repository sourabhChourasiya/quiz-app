/*
* Route wrapper to check the authentication of 
* the user to navigate to the internal pages.
* */

import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import pageRoute from '../pageRoutes'

export class AuthRoute extends React.Component {

  componentWillMount() {
      const {isPlayQuiz} = this.props
      if (!isPlayQuiz) {
        window.appHistory.replace(pageRoute.home)
      }
  }
  render() {
      return (
          <Route {...this.props} />
      )
  }
}

const mapStateToProps = (state) => ({
    isPlayQuiz: state.questions.isPlayQuiz || false
})

export default connect(mapStateToProps)(AuthRoute)

import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

export class AuthRoute extends React.Component {

  componentWillMount() {
      const {isPlayQuiz} = this.props
      if (!isPlayQuiz) {
        window.appHistory.replace('/')
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

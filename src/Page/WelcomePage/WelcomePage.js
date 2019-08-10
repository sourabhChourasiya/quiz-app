/*
* This is the home page of the quiz app.
* */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pageRoute from '../../Routes/pageRoutes';
import Button from '../../Components/Button/Button';
import { playQuiz, resetApp } from "../../redux/modules/questions";

class WelcomePage extends React.Component {
    componentDidMount(){
        const {getAllQuestionsFromStore, resetApp} = this.props
        if(getAllQuestionsFromStore.length > 0){
            resetApp()
        }
    }

    render(){
        const { playQuiz } = this.props;
        return(
            <div className="landing-page">
                <h1>Welcome to Quiz</h1>
                <Button buttonText="Start Quiz" onClick={()=> {playQuiz(true); window.appHistory.push(pageRoute.quizPage)}} />
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    getAllQuestionsFromStore: state.questions.questions || []
})

WelcomePage.propTypes = {
    playQuiz: PropTypes.func
};

export default connect(mapStateToProps, {
    playQuiz,
    resetApp
})(WelcomePage)

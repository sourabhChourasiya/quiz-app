/*
* This is the result page to display total score
* with all the question and their answer.
* */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import pageRoute from '../../Routes/pageRoutes'
import Button from '../../Components/Button/Button';
import { resetApp } from "../../redux/modules/questions";

import './resultPage.scss'

class ResultPage extends React.Component {
    /*
     * displayResult() method to display the question, selected answer
     * by user and the result of the answer
     * */
    displayResult () {
        const {questions, correctAnswers}  = this.props.getAllResultFromStore;
        let correctAnswersSet = new Set(correctAnswers)
        return questions.map((ques, index) =>
            <div key={index} className="question-list">
                <div className="question">
                    <label>Question: {index + 1}:</label>
                    <div dangerouslySetInnerHTML={{__html: ques.question}} />
                </div>
                <div className="selected">
                    <label>You Selected:</label>
                    <div>{correctAnswersSet.has(index)? 'True' : 'False'}</div>
                </div>
                <div className="answer">
                    <label>Your Answer was:</label>
                    <div>{correctAnswersSet.has(index)? 'Correct' : 'Wrong '}</div>
                </div>
            </div>
        )
    }

    render () {
        const { resetApp } = this.props
        const {questions, correctAnswers, wrongAnswers}  = this.props.getAllResultFromStore;
        return(
            <div className="result-page">
                <h1 className="message-label">Thank you</h1>
                <div>
                    <h4>Total Score</h4>
                    <div className="score">
                        <label htmlFor="totalQuestions">Total Questions: </label>
                        <span id="totalQuestions">{questions.length}</span>
                    </div>
                    <div className="score">
                        <label htmlFor="totalCorrectAnswer">Correct Answers: </label>
                        <span id="totalCorrectAnswer">{correctAnswers.length}</span>
                    </div>
                    <div className="score">
                        <label htmlFor="totalWrongAnswer">Wrong Answers: </label>
                        <span id="totalWrongAnswer">{wrongAnswers.length}</span>
                    </div>
                </div>
                <div className="all-question-list">{this.displayResult()}</div>
                <Button buttonText="Play Again" onClick={()=> {resetApp(); window.appHistory.push(pageRoute.home)}} />
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    getAllResultFromStore: state.questions || {}
})

ResultPage.propTypes = {
    resetApp: PropTypes.func.isRequired,
    getAllResultFromStore: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
    resetApp
})(ResultPage)

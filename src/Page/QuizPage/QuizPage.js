/*
* This is the quiz page
* */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { getQuestions } from '../../lib/api';
import pageRoute from '../../Routes/pageRoutes';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '../../Components/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setQuestions, recordAnswer } from "../../redux/modules/questions";

class QuizPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            message: '',
            questions : [],
            openSnackbar: false,
            currentQuestionNumber: 0
        }
    }
    componentDidMount(){
        const { setQuestions, isPlayQuiz, getAllQuestionsFromStore } = this.props
        if(!isPlayQuiz){
            return
        }

        if(getAllQuestionsFromStore.length > 0){
            window.appHistory.push(pageRoute.home)
            return
        }

        /*
        * API call to fetch questions.
        * on Success, sets the response to Redux store.
        * On Error, Displays error message to User
        * */
        getQuestions().then((response)=>{
            setQuestions(response.results)
        }).catch((error)=>{
            this.setState(() => {
                return {
                    openSnackbar: true,
                    message: 'Something went Wrong, Please try again'
                }
            })
        })
    }

    /*
    * Detects new props to the store and 
    * sets to the component state. 
    * */
    static getDerivedStateFromProps(nextProps) {
        return {
            questions: nextProps.getAllQuestionsFromStore
        };
    }

    /*
     * @params {object} question
     * @params {boolean} answer
     *
     * setAnswer() method to check weather the answer is correct or
     * incorrect, displays message to the user and sets
     * the result to the Redux store.
     * */
    setAnswer = (question, answer) => {
        const {currentQuestionNumber, questions} = this.state
        const {recordAnswer} = this.props
        let message = ''
        let isAnswerCorrect = false

        if(question.correct_answer.toLowerCase() === `${answer}`){
            message = 'Your Answer is Correct'
            isAnswerCorrect = true
        } else {
            message = 'Your Answer is Wrong'
        }
        recordAnswer({isAnswerCorrect, questionIndex: currentQuestionNumber})

        this.setState((prevState) => {
            return {
                openSnackbar: !prevState.openSnackbar,
                message: message
            }
        })

        setTimeout(()=>{
            if(currentQuestionNumber + 1 >= questions.length){
                window.appHistory.push(pageRoute.resultPage)
                return
            } else {
                this.setState((prevState) => {
                        return {
                            currentQuestionNumber: prevState.currentQuestionNumber+1,
                            openSnackbar: !prevState.openSnackbar,
                            message: ''
                        }
                    })
            }
        }, 1000)
    }


    /*
     * @params {object} q(question)
     * @params {number} currentQuestionNumber
     *
     * displayQuestions() method to display the question and two option
     * to the user.
     * */
    displayQuestions = (q, currentQuestionNumber) => {
        const { questions, openSnackbar } = this.state
        return(
            // <div key={i} dangerouslySetInnerHTML={{__html: q.question}} />
            <div key={currentQuestionNumber}>
                <div><h4>Category</h4><span>{q.category}</span></div>
                <div><h4>Question {currentQuestionNumber+1} / {questions.length}</h4><div dangerouslySetInnerHTML={{__html: q.question}} /></div>
                <h4>Please select your answer</h4>
                <div>
                    <Button buttonText="True" disabled={openSnackbar} onClick={() => this.setAnswer(q, true)} />
                    <Button buttonText="False" disabled={openSnackbar} onClick={() => this.setAnswer(q, false)} />

                </div>
            </div>
        )
    }

    render () {
        const { currentQuestionNumber, questions, openSnackbar, message } = this.state

        return(
            <>
            {questions.length === 0 && <div style={{textAlign: 'center', margin: '50px'}}><CircularProgress /></div>}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key={`${'top'},${'center'}`}
                open={openSnackbar}
                message={<span>{message}</span>}
            />
            <div>
                {questions.length > 0 && this.displayQuestions(questions[currentQuestionNumber], currentQuestionNumber)}
            </div>
            </>
        )

    }
}

const mapStateToProps = (state) => ({
    getAllQuestionsFromStore: state.questions.questions || [],
    isPlayQuiz: state.questions.isPlayQuiz || false
})

QuizPage.propTypes = {
    getAllQuestionsFromStore: PropTypes.array.isRequired,
    isPlayQuiz: PropTypes.bool.isRequired,
    setQuestions: PropTypes.func.isRequired,
    recordAnswer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    setQuestions,
    recordAnswer,
})(QuizPage);

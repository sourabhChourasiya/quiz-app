// const
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const RECORD_ANSWER = 'RECORD_ANSWER';
export const RESET_APP = 'RESET_APP';
export const PLAY_QUIZ = 'PLAY_QUIZ';

// action to set questions
export function setQuestions(data) {
    return {
        type: SET_QUESTIONS,
        payload: data
    }
}

export function recordAnswer(data) {
    return {
        type: RECORD_ANSWER,
        payload: data
    }
}

export function playQuiz(isPlay) {
    return {
        type: PLAY_QUIZ,
        payload: isPlay
    }
}

export function resetApp() {
    return{
        type: RESET_APP
    }
}

// reducers
const initialState = {
    questions: [],
    correctAnswers: [],
    wrongAnswers: [],
    isPlayQuiz: false
};

export default function (state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case RESET_APP:
            return { ...state, questions: [], correctAnswers: [], wrongAnswers: [], isPlayQuiz: false}
        case PLAY_QUIZ:
            return { ...state, isPlayQuiz: action.payload}
        case SET_QUESTIONS:
            return { ...state, questions: action.payload };
        case RECORD_ANSWER:
            if(action.payload.isAnswerCorrect){
                let correctAnswers = state.correctAnswers
                correctAnswers.push(action.payload.questionIndex)
                return { ...state, correctAnswers: correctAnswers };
            } else {
                let wrongAnswers = state.wrongAnswers
                wrongAnswers.push(action.payload.questionIndex)
                return { ...state, wrongAnswers: wrongAnswers };
            }
        default:
            return state
    }
}

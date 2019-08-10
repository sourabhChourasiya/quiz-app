import { apiCaller } from './apiCaller'

/*
* getQuestions() method to call the api to
* fetch the questions
* */
export function getQuestions () {
    let url ='https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
    return apiCaller({'method': 'GET', url})
}
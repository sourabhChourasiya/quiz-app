import React from 'react';
import pageRoute from './pageRoutes';
import AuthRoute from './RouteWrapper/AuthRoute';
import { Router, Switch, Route } from "react-router-dom";

import QuizPage from '../Page/QuizPage/QuizPage';
import ResultPage from '../Page/ResultPage/ResultPage';
import WelcomePage from '../Page/WelcomePage/WelcomePage';

const renderRoutes = ({history}) =>
    <Router history={history}>
        <Switch>
            <Route exact path={pageRoute.home} component={WelcomePage} />
            <AuthRoute exact path={pageRoute.quizPage} component={QuizPage} />
            <AuthRoute exact path={pageRoute.resultPage} component={ResultPage} />
        </Switch>
    </Router>

export default renderRoutes

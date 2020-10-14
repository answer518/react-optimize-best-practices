import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorBoundary from './ErrorBoundary'

import './styles.css';

const List = lazy(() => import(/* webpackChunkName: "List" */'./List'))

const loading = () => <>loading...</>

function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={loading()}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Scroll} />
                    </Switch>
                </Router>
            </Suspense>
        </ErrorBoundary>
    )
}

export default App
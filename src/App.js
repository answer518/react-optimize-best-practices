import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorBoundary from './ErrorBoundary'

const Header = lazy(() => import(/* webpackChunkName: "header" */'./components/Header'));
const Body = lazy(() => import(/* webpackChunkName: "body" */'./components/Body'));
const Footer = lazy(() => import(/* webpackChunkName: "footer" */'./components/Footer'));


const loading = () => <>loading...</>

const Home = () => {
    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    )
}

function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={loading()}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Router>
            </Suspense>
        </ErrorBoundary>
    )
}

export default App
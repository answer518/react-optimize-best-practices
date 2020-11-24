import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorBoundary from './ErrorBoundary'

const Header = lazy(() => import(/* webpackChunkName: "header" */'./components/Header'));
const Body = lazy(() => import(/* webpackChunkName: "body" */'./components/Body'));
const Footer = lazy(() => import(/* webpackChunkName: "footer" */'./components/Footer'));

const About = lazy(() => import(/* webpackChunkName: "about" */'./components/About'));

const loading = () => <>loading...</>

const HomePage = (props) => {
    return (
        <>
            <Header />
            <Body />
            <Footer />
            <button onClick={() => props.history.push('/about')}>about me</button>
        </>
    )
}

const AboutPage = () => {
    return (
        <About/>
    )
}

function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={loading()}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/about" component={AboutPage} />
                    </Switch>
                </Router>
            </Suspense>
        </ErrorBoundary>
    )
}

export default App
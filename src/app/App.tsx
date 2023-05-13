import "./App.css"

import {TodolistsList} from "../features/TodolistsList"
import {useSelector} from "react-redux"
import {appActions} from "../features/Application"
import {authActions, authSelectors, Login} from "../features/Auth"
import {selectIsInitialized, selectStatus} from "../features/Application/selectors"
import {useActions} from "../utils/redux-utils"

import {useCallback, useEffect} from "react";
import {Route} from "react-router-dom"
import {
    AppBar, Button,
    CircularProgress, Container,
    IconButton, LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core"
import {Menu} from "@material-ui/icons";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
            initializeApp()
        }
    }, [])

    const logoutHandler = useCallback(() => {
        logout()
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn &&
                        <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Route exact path={"/"}
                       render={() => <TodolistsList demo={demo}/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
            </Container>
        </div>
    )
}

export default App

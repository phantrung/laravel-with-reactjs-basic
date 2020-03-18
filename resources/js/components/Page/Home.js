import React from 'react';
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import {Toolbar,IconButton,Typography,Button} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

const Home = (props) => {
    console.log(`===========> props`,props)
    const token = localStorage.getItem('access_token')
    return (
        <div>
            <AppBar position="static" className="d-flex">
                <Toolbar>
                    <IconButton edge="start" className="m-8" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="flex-grow-1">
                        News
                    </Typography>
                    {token ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                // onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    ) : (
                        <Button color="inherit">
                            <Link to="/login">Login</Link>
                        </Button>
                    )}

                </Toolbar>
            </AppBar>
            <div style={{ margin: 24 }}>
                {props.children}
            </div>
        </div>
    )
}

export default Home;

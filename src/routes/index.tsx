import React from "react";
import {
    Link,
    Route,
    Switch
} from "react-router-dom";
import clsx from "clsx";
import useStyles from "./useStyles";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Container } from "@material-ui/core";
import NotFound from "../components/NotFound";
import ViewPerson from "../pages/Person";

export interface ILinks {
	name: string;
	to: string;
}

export interface IRoutes {
	exact?: boolean;
	path: string;
	component: () => JSX.Element;
}

export const links: ILinks[] = [
    {
        name: "Pessoa",
        to: "/pessoa"
    }
];

export const routes: IRoutes[] = [
    {
        path: "/pessoa",
        exact: true,
        component: () => <ViewPerson title="Pessoa" />
    },
    {
        path: "*",
        component: () => <NotFound />
    }
];

const Routes: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <React.Fragment>
					{
						links.map((route: ILinks, index: number) => (
							<ListItem
								id={`${route.name.toLowerCase()}-${index}`}
								button
								component={Link}
								to={route.to}
								key={index}
							>
								<ListItemText primary={route.name} />
							</ListItem>
						))
					}
				</React.Fragment>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Container maxWidth="lg" className={classes.container}>
					<Switch>
						{
							routes.map((route: IRoutes, index: number) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.component />} />
                            ))
						}
					</Switch>
				</Container>
            </main>
        </div>
    );
}

export default Routes;
import "reflect-metadata";
import React, { useEffect } from "react";
import { Route } from "react-router";
import { Container } from "typedi";
import { observer } from "mobx-react-lite";
import Layout from "layout";

import Spinner from "primitives/Spinner";

import { useSetDocumentTitle } from "libs/hooks";

import Screen from "modules/screen";
import ToastReceiver from "modules/ToastReceiver";
import usePageContextSynchronizer from "modules/context/usePageContextSynchronizer";

import { SystemState } from "state/systemState";

const systemState = Container.get(SystemState);

function App() {
  useEffect(systemState.loadConfig, []);
  useSetDocumentTitle(systemState.stateContainer.state.title || "Административная панель");
  usePageContextSynchronizer();

  if (systemState.stateContainer.empty) {
    return <Spinner color="blue/10" size={132} />;
  }

  const state = systemState.stateContainer.state;

  return (
    <Layout logo={state.logo} sidebarDataSource={state.sideMenu.dataSource}>
      {state.screens.map((screen) => (
        <Route key={screen.reference} exact path={screen.reference} render={() => <Screen screen={screen} />} />
      ))}
      <ToastReceiver />
    </Layout>
  );

  // return (
  //   <WrappedDrawerMenu
  //     dataSource={state.sideMenu.dataSource}
  //     content={(openMenu: any) => (
  //       <>
  //         <AppBar position="sticky">
  //           <Toolbar>
  //             <IconButton color="inherit" aria-label="open drawer" onClick={openMenu} edge="start">
  //               <MenuIcon />
  //             </IconButton>
  //             <Typography variant="h6">
  //               {state.title || (
  //                 <Skeleton
  //                   variant="text"
  //                   width={700}
  //                   height={50}
  //                   style={{
  //                     backgroundColor: "rgba(255, 255, 255, .3)",
  //                   }}
  //                 />
  //               )}
  //             </Typography>
  //           </Toolbar>
  //         </AppBar>
  //         <Switch>
  //           {state.pages.map((screen: any) => (
  //             <Route
  //               key={screen.pageUrl}
  //               exact
  //               path={screen.pageUrl}
  //               // @ts-ignore
  //               render={(props) => <AdminPage {...props} settings={screen} />}
  //             />
  //           ))}
  //         </Switch>
  //       </>
  //     )}
  //   />
  // );
}

export default React.memo(observer(App));

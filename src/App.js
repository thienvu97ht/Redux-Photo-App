// @ts-nocheck
import { unwrapResult } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { getMe } from "app/userSlice";
import Header from "components/Header/index";
import NotFound from "components/NotFound/index";
import SignIn from "features/Auth/pages/SignIn";
import firebase from "firebase/app";
import "firebase/auth";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Button } from "reactstrap";
import "./App.scss";

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ...
};
firebase.initializeApp(config);

// Lazy load - Code splitting
const Photo = React.lazy(() => import("./features/Photo"));

function App() {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await productApi.getAll(params);

        setProductList(response.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchProductList();
  }, []);

  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logs our
          console.log("User is not logged in");
          return;
        }

        // Get me when signed in
        try {
          const action = getMe();
          const actionResult = await dispatch(action);
          const currentUser = unwrapResult(actionResult);
          console.log(currentUser);
        } catch (error) {
          console.log("Faild to login: ", error.message);
          // show toast error
        }

        // console.log("Logged in user: ", user.displayName);
        // const token = await user.getIdToken();
        // console.log("Logged in user token: ", token);
        localStorage.setItem(
          "firebaseui::rememberedAccounts",
          JSON.stringify(user.providerData)
        );
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleButtonClick = async () => {
    try {
      const params = {
        _page: 1,
        _limit: 10,
      };
      const response = await productApi.getAll(params);

      setProductList(response.data);
    } catch (error) {
      console.log("Failed to fetch product list: ", error);
    }
  };

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Header />

          <Switch>
            <Redirect exact from="/" to="photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Button onClick={handleButtonClick}>Fetch Product List</Button>
      </Suspense>
    </div>
  );
}

export default App;

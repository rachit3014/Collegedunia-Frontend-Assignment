import { configureStore } from "@reduxjs/toolkit";
import { Collegereducer } from "./reducer/college";
const store=configureStore({
    reducer:{
        Collegereducer
    },
});

export default store;
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useAxios from "./useAxios";
import fetchdata from "../utilities/fetchData";
import { AuthContext } from "../context/Provider";

const useFetch = (url) => {
    const axiosInstance = useAxios();
    const [state, setState] = useState({});
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (!user) return;
        async function fe() {
            const data = await fetchdata(url, axiosInstance);
            setState(data);
        }
        fe();
    }, [url]);
    return state;
};

export { useFetch };
import axios from "axios";
import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import fetchdata from "../utilities/fetchData";

const useFetch = (url) => {
    const axiosInstance = useAxios();
    const [state, setState] = useState({});
    useEffect(() => {
        async function fe() {
            const data = await fetchdata(url, axiosInstance);
            setState(data);
        }
        fe();
    }, [url]);
    return state;
};

export { useFetch };
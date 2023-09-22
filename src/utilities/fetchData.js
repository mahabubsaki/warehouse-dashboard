async function fetchdata(url, axiosInstance) {
    const { data } = await axiosInstance.get(url);
    return data;
    ;
}
export default fetchdata;
async function fetchdata(url, axiosInstance) {
    console.log(axiosInstance);
    const { data } = await axiosInstance.get(url);
    return data;
    ;
}
export default fetchdata;
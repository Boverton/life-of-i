import axios from 'axios';


const error = (err) => {
    console.log("There was an issue", err);
};

export const post = (url, data, source) => {
    const config = {
        validateStatus: function (status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
        },
        cancelToken: source.token,
    };
    // add the token to the data here
    return axios.post(url, data, config)
        .catch((err) => console.log(err));
};

export default post;
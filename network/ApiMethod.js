import { baseUrl, getData, login, register, logout, forgotPassword, social_fb } from './ApiConstant';

export const fetchData = async (crPage, callback) => {
    const stringURL = baseUrl + getData + crPage;
    let obj = {
        method: 'GET',
        headers: {
            'app_token': 'dCuW7UQMbdvpcBDfzolAOSGFIcAec11a'
        }
    };

    try {
        let response = await fetch(stringURL, obj);
        let responseJson = await response.json();
        const { data, paging } = responseJson;
        callback(data, paging);

    } catch (error) {
        console.log(`Error ${error}`);
    }
};

export const userLogin = async (email, password, callback) => {
    const stringURL = baseUrl + login;

    let formBody = new FormData()
    formBody.append('email', email);
    formBody.append('password', password);

    let obj = {
        method: 'POST',
        headers: {
            'app_token': 'dCuW7UQMbdvpcBDfzolAOSGFIcAec11a',
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        },
        body: formBody
    };

    try {
        let response = await fetch(stringURL, obj);
        let responseJson = await response.json();

        const { data, error } = responseJson;
        callback(data, error);

    } catch (error) {
        console.log(`Error: ${error}`);
    }

};


export const userRegister = async (name, email, password, callback) => {
    const stringURL = baseUrl + register;

    let formBody = new FormData()
    formBody.append('full_name', name);
    formBody.append('email', email);
    formBody.append('password', password);

    let obj = {
        method: 'POST',
        headers: {
            'app_token': 'dCuW7UQMbdvpcBDfzolAOSGFIcAec11a',
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        },
        body: formBody
    };

    try {
        let response = await fetch(stringURL, obj);
        let responseJson = await response.json();

        const { data, error } = responseJson;
        callback(data, error);

    } catch (error) {

        console.log(`Error: ${error}`);
    }
};

export const userLogout = async (access_token, callback) => {
    const stringURL = baseUrl + logout;

    let obj = {
        method: 'POST',
        headers: {
            'app_token': 'dCuW7UQMbdvpcBDfzolAOSGFIcAec11a',
            'access_token': access_token
        }
    };

    try {
        let response = await fetch(stringURL, obj);
        let responseJson = await response.json();
        const { message, error } = responseJson;
        callback(message, error);

    } catch (error) {
        console.log(`Error ${error}`);
    }
}

export const userForgotPassword = async (email, callback) => {
    const stringURL = baseUrl + forgotPassword;

    let formBody = new FormData();
    formBody.append('email', email);

    let obj = {
        method: 'POST',
        headers: {
            'app_token': 'dCuW7UQMbdvpcBDfzolAOSGFIcAec11a',
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        },
        body: formBody
    };

    try {
        let response = await fetch(stringURL, obj);
        let responseJson = await response.json();

        const { message, error } = responseJson;
        callback(message, error);

    } catch (error) {
        console.log(`Error: ${error}`);
    }

}

export const userLoginFb = async (email, fullname, facebook_id, avatar, facebook_token, callback) => {
    const stringURL = baseUrl + social_fb;

    let formBody = new FormData();
    formBody.append('email', email);
    formBody.append('full_name', fullname);
    formBody.append('facebook_id', facebook_id);
    formBody.append('avatar', avatar);
    formBody.append('facebook_token', facebook_token);

    let obj = {
        method: 'POST',
        headers: {
            'app_token': 'dCuW7UQMbdvpcBDfzolAOSGFIcAec11a',
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        },
        body: formBody
    };

    try {
        let response = await fetch(stringURL, obj);
        let responseJson = await response.json();

        const { message, error } = responseJson;
        callback(message, error);

    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


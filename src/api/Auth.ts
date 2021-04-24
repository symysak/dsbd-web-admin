import axios from "axios";
import {restfulApiConfig} from "./Config";

export function Login(username: string, password: string): Promise<string> {
    return axios.post(restfulApiConfig.apiURL + "/token/generate", null, {
        headers: {
            'Content-Type': 'application/json',
            'USER': username,
            'PASS': password
        }
    }).then(res => {
        console.log(res.data.token[0]);
        sessionStorage.setItem("ACCESS_TOKEN", res.data.token[0].access_token);
        return "";
    }).catch(err => {
        console.log(err);
        return err;    })
}

// export const login = Login

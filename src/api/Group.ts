import axios from "axios";
import {restfulApiConfig} from "./Config";

export function GetAll(): Promise<{ error: string, data: any }> {
    return axios.get(restfulApiConfig.apiURL + "/group", {
        headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
        }
    }).then(res => {
        return {
            error: "",
            data: res.data.group
        };
    }).catch(err => {
        console.log(err);
        return {
            error: err.error.error,
            data: null
        };
    })
}
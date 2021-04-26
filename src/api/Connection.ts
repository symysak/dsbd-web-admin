import axios from "axios";
import {restfulApiConfig} from "./Config";
import {ConnectionDetailData} from "../interface";

export function Update(data: ConnectionDetailData): Promise<{ error: string; data: any }> {
    return axios.put(restfulApiConfig.apiURL + "/connection/" + data.ID, data, {
        headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
        }
    }).then(res => {
        return {
            error: "",
            data: res.data.service
        };
    }).catch(err => {
        console.log(err);
        return {
            error: err,
            data: null
        };
    })
}

export function GetAll(): Promise<{ error: string, data: any }> {
    return axios.get(restfulApiConfig.apiURL + "/connection", {
        headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
        }
    }).then(res => {
        return {
            error: "",
            data: res.data.service
        };
    }).catch(err => {
        console.log(err);
        return {
            error: err,
            data: null
        };
    })
}

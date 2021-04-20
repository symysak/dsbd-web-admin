export interface UserDetailData {
    ID: number,
    name: string,
    email: string,
}

export interface TicketDetailData {
    ID: number,
    solved: boolean,
    title: string,
}

export interface ServiceDetailData {
    ID: number,
    open: boolean,
    asn: number,
    service_number: number,
    service_template: ServiceTemplateData
    connections: ConnectionDetailData[]
}

export interface ServiceTemplateData {
    ID: number,
    name: string,
    type: string
}

export interface ConnectionDetailData {
    ID: number,
    link_v4_our: string,
    link_v4_your: string,
    link_v6_our: string,
    link_v6_your: string,
    term_ip: string,
    open: boolean,
    connection_number: number,
    connection_template: ConnectionTemplateData
}

export interface ConnectionTemplateData {
    ID: number,
    name: string,
    type: string
}

export interface GroupDetailData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    status: number,
    agree: boolean,
    question: string,
    org: string,
    org_en: string,
    postcode: string,
    address: string,
    address_en: string,
    tel: string,
    country: string,
    contract: string,
    users: UserDetailData[],
    tickets: TicketDetailData[],
    services: ServiceDetailData[]
}

export const DefaultGroupDetailData: GroupDetailData = {
    ID: 0,
    CreatedAt: "",
    UpdatedAt: "",
    org: "",
    org_en: "",
    status: 0,
    agree: false,
    question: "",
    postcode: "",
    address: "",
    address_en: "",
    tel: "",
    country: "",
    contract: "",
    users: [{
        ID: 0,
        name: "",
        email: "",
    }],
    tickets: [{
        ID: 0,
        solved: false,
        title: "",
    }],
    services: [{
        ID: 0,
        asn: 0,
        open: false,
        service_number: 0,
        service_template: {
            ID: 0,
            name: "",
            type: "",
        },
        connections: [{
            ID: 0,
            link_v4_our: "",
            link_v4_your: "",
            link_v6_our: "",
            link_v6_your: "",
            term_ip: "",
            open: false,
            connection_number: 0,
            connection_template: {
                ID: 0,
                name: "",
                type: ""
            }
        }],
    }],
};
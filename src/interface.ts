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
    CreatedAt: string,
    UpdatedAt: string,
    group_id: number,
    open: boolean,
    asn: number,
    fee: number,
    org: string,
    org_en: string,
    postcode: string,
    address: string,
    address_en: string,
    route_v4: string,
    route_v6: string,
    avg_downstream: number,
    avg_upstream: number,
    max_downstream: number,
    max_upstream: number,
    max_bandwidth_as: number,
    service_number: number,
    lock: boolean,
    add_allow: boolean,
    ip?: IPData[],
    jpnic_admin?: JPNICData,
    jpnic_tech?: JPNICData[],
    service_template: ServiceTemplateData
    connections?: ConnectionDetailData[]
}

export interface IPData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string,
    service_id: number,
    PlanJPNIC: string,
    start_date: string,
    end_date: string,
    user_case: string
    ip: string,
    name: string,
    version: number
    open: boolean,
    plan?: PlanData[]
}

export interface PlanData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string,
    name: string,
    ip: string,
    after: number,
    half_year: number,
    one_year: number
}

export interface JPNICData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string,
    address: string,
    address_en: string,
    country: string,
    dept: string,
    dept_en: string,
    fax: string,
    jpnic_handle: string,
    mail: string,
    name: string,
    name_en: string,
    org: string,
    org_en: string,
    postcode: string,
    tel: string,
    lock: boolean
}

export interface ServiceTemplateData {
    ID: number,
    name: string,
    comment: string,
    type: string
    need_comment: boolean,
    need_global_as: boolean,
    need_jpnic: boolean,
    need_route: boolean
}

export interface ConnectionDetailData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    address: string,
    link_v4_our: string,
    link_v4_your: string,
    link_v6_our: string,
    link_v6_your: string,
    term_ip: string,
    open: boolean,
    monitor: boolean,
    noc?: NocTemplateData,
    noc_id: number,
    bgp_router_id: number,
    bgp_router?: BGPRouterDetailData,
    connection_number: number,
    tunnel_endpoint_router_ip_id: number,
    ntt_template_id: number,
    ntt_template?: NTTTemplateData,
    connection_template: ConnectionTemplateData,
    tunnel_endpoint_router_ip?: TunnelEndPointRouterIPTemplateData
}

export interface BGPRouterDetailData {
    CreatedAt: string
    DeletedAt: string
    ID: number
    UpdatedAt: string
    address: string
    comment: string
    enable: boolean
    hostname: string
    noc: NocTemplateData
    noc_id: number
    tunnel_endpoint_router: null
}

export interface NocTemplateData {
    CreatedAt: string
    DeletedAt: string
    ID: number
    UpdatedAt: string
    name: string
    bandwidth: string
    bgp_router: BGPRouterDetailData
    comment: string
    enable: boolean
    location: string
}

export interface NTTTemplateData {
    CreatedAt: string
    DeletedAt: string
    ID: number
    UpdatedAt: string
    name: string
    comment: string
    hidden: boolean
}

export interface IPTemplateData {
    CreatedAt: string
    DeletedAt: string
    ID: number
    UpdatedAt: string
    comment: string
    hide: boolean
    quantity: number
    subnet: string
    title: string
}

export interface TunnelEndPointRouterTemplateData {
    CreatedAt: string
    DeletedAt: string
    ID: number
    UpdatedAt: string
    capacity: number
    comment: string
    enable: boolean
    hostname: string
    noc_id: number
    tunnel_endpoint_router_ip: TunnelEndPointRouterIPTemplateData[]
}

export interface TunnelEndPointRouterIPTemplateData {
    CreatedAt: string
    DeletedAt: string
    ID: number
    UpdatedAt: string
    ip: string,
    enable: boolean
    tunnel_endpoint_router: TunnelEndPointRouterTemplateData
}

export interface ConnectionTemplateData {
    CreatedAt: string
    DeletedAt: string
    ID: number
    UpdatedAt: string
    name: string,
    type: string
    comment: string
    need_comment: boolean
    need_cross_connect: boolean
    need_internet: boolean
}

export interface GroupDetailData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    status: number,
    pass: boolean,
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
    student: boolean,
    student_expired: string,
    fee: number,
    lock: boolean,
    users: UserDetailData[],
    tickets?: TicketDetailData[],
    services?: ServiceDetailData[]
}

export interface TemplateData {
    bgp_router?: BGPRouterDetailData[]
    connections?: ConnectionTemplateData[]
    services?: ServiceTemplateData[]
    ipv4?: IPTemplateData[]
    ipv6?: IPTemplateData[]
    nocs?: NocTemplateData[]
    ntts?: NTTTemplateData[]
    tunnel_endpoint_router?: TunnelEndPointRouterTemplateData[]
    tunnel_endpoint_router_ip?: TunnelEndPointRouterIPTemplateData[]
}

export const DefaultTemplateData: TemplateData = {
    bgp_router: undefined,
    connections: undefined,
    services: undefined,
    ipv4: undefined,
    ipv6: undefined,
    nocs: undefined,
    ntts: undefined,
    tunnel_endpoint_router: undefined,
    tunnel_endpoint_router_ip: undefined
}

export const DefaultGroupDetailData: GroupDetailData = {
    ID: 0,
    CreatedAt: "",
    UpdatedAt: "",
    org: "",
    org_en: "",
    status: 0,
    pass: false,
    agree: false,
    question: "",
    postcode: "",
    address: "",
    address_en: "",
    tel: "",
    country: "",
    contract: "",
    student: false,
    student_expired: "",
    fee: 0,
    lock: false,
    users: [{
        ID: 0,
        name: "",
        email: "",
    }],
    tickets: undefined,
    services: undefined,
};

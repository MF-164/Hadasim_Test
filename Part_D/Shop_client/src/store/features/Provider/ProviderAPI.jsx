import axios from 'axios'


export const GetAll = async () => {
    let { data } = await axios.get('https://localhost:7029/api/Provider/GetAllProviders')
    return data
}

export const GetOneById = async (id) => {
    let url = 'https://localhost:7029/api/Provider/GetProviderById/' + id
    let { data } = await axios.get(url)
    return data
}

export const Insert = async (provider) => {
    let { data } = await axios.post('https://localhost:7029/api/Provider/CreateProvider', provider)
    return data
}

export const Login = async (provider) => {
    console.log('bbbbbbbbbbbbbbbbbbbbb ',{provider});
    
    let { data } = await axios.post('https://localhost:7029/api/Provider/Login', provider)
    console.log({data});
    
    return data
}

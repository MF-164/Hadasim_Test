import axios from "axios"

export const GetOneById = async (id) => {
    let url = 'https://localhost:7029/api/Product/GetProductById/' + id
    const { data } = await axios.get(url)
    return data
}

export const GetOneByProviderId = async (providerId) => {

    let url = 'https://localhost:7029/api/Product/GetProductsByProvider/' + providerId
    const {data} = await axios.get(url)
    if (data === "")
        return null
    else
        return data
}

export const Insert = async (product) => {
    const { data } = await axios.post('https://localhost:7029/api/Product/CreateProduct/', product)
    return data
}

export const GetAll = async () => {
    const {data} = await axios.get('https://localhost:7029/api/Product/GetAll/')
    if (data === "")
        return null
    else
        return data
}


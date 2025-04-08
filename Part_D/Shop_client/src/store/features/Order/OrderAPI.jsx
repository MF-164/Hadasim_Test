import axios from "axios"


export const GetAll = async () => {
    let { data } = await axios.get('https://localhost:7029/api/Order/GetAllOrders')
    return data
}

export const GetOneById = async (id) => {
    let url = 'https://localhost:7029/api/Order/GetOrderbyId/' + id
    const { data } = await axios.get(url)
    return data
}

export const GetByProviderId = async (providerId) => {
    let url = 'https://localhost:7029/api/Order/GetOrdersByProviderId/' + providerId;
    try {
        const { data } = await axios.get(url);
        console.log('Response data: ', { data });
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
}

export const Insert = async (order) => {
try{
    const { data } = await axios.post('https://localhost:7029/api/Order/CreateOrder', order)
    return data
}catch(error){
    console.log(error);
    return null
}
}

export const UpdateStatus = async (id, newStatus) => {
    console.log({ newStatus });

    let url = 'https://localhost:7029/api/Order/UpdateStatusByOrderId/' + id
    const { data } = await axios.put(url, newStatus, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data
}

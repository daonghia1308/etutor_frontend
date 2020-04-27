import axios from 'axios'
const HOST = 'https://etutor-project.herokuapp.com'

const request = async (url, data, method) => {
    url = HOST + url
    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`,

    }
    console.log("%c-----------" + method + "------------", 'color: green; font-size: 16px')
    try {
        let response = await axios({
            headers,
            method,
            url,
            data
        });
        console.log("%c-----------RESPONSE-----------", 'color: red; font-size: 16px')
        console.log(response)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        
        if (error.response) {
            if (error.response.status === 401) {
                
                sessionStorage.clear();
                window.location.reload();
            }
        }
        return error.response.data;
    }

}

export default request;
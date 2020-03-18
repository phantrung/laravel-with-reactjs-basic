import axios from 'axios'
let token = window.Laravel.csrfToken;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

axios.interceptors.response.use(
    response => {
        if(response.hasOwnProperty('data')){
            if(response.data instanceof Object && response.data.hasOwnProperty('errors')){
                return Promise.reject(response)
            }
            if(!response.data){
                return {success : true}
            }
            return  response.data
        }
        return Promise.reject(response)
    },
    (error) => {
        if(error.response.status === 401 ) {
            console.log('401');
        }
        return Promise.reject(error);
    }
);
class ModelAbstract {


    constructor() {
        this.BASE_ENDPOINT = "/"
        this.key = 'id'
    }


    getList = async (params = {}) => {
        const response = await axios.get(this.BASE_ENDPOINT,{
            params : params
        })
        return response
    }

    getDetail = async (id = null, params = {}) => {
        const response = await axios.get(`${this.BASE_ENDPOINT}/${id}`,{
            params
        })
        return response
    }

    postCreate = async (data = {},config = {}) => {
        return await axios.post(this.BASE_ENDPOINT,data,config)
    }

    putUpdate = async (data = {},config = {}) => {
        return await axios.put(this.BASE_ENDPOINT + `/${data.id}`,data,config)
    }

    save = async (data = {},config = {}) => {
        if(data.hasOwnProperty('id') && data.id){
            return await this.putUpdate(data,config)
        } else {
            return await this.postCreate(data,config)
        }
    }

    deleteWithPath = async id => {
        if(id){
            const api = this.BASE_ENDPOINT+'/'+id
            // this.request.setApiNotAuth([api])
            return await axios.delete(api)
        }
    }
}
export default ModelAbstract

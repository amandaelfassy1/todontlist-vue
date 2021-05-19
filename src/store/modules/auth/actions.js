import axios from 'axios'
import Toastify from 'toastify-js'

export const login = ({ commit }, form) => {
    axios.post(
        'http://127.0.0.1:8000/api/auth/login',
        {
            email: form.email,
            password: form.password,
            device_name: "vue"
        }
        ).then((response) => {
          
            console.log(response);
            const token = response.data.token.split("|")[1]
            console.log(token)

            axios.defaults.headers["Authorization"] = "Bearer " + token;
            window.localStorage.setItem("token", token)
            const user = {
                name: response.data.name,
                email: response.data.email,
                created_at: response.data.created_at
            }
            
            commit('data', user)

            Toastify({
                text: response.data.message,
                backgroundColor: "#1FDF70",
                className: "error",
            }).showToast();
            
            window.location.href = "/tasks";

       }).catch((error) => {
           console.log(error)
        Toastify({
            text: error.response.data.message,
            backgroundColor: "#c0392b",
            className: "error",
        }).showToast();
       }); 
}

export const me = ({commit}, state)=>{
    const token = state.user.token;
    if(!token){
        return;
    }
    axios 
    .get(
        `http://127.0.0.1:8000/api/auth/me`, 
        // { 
        //     headers :{
        //         'Authorization' :`Bearer ${token}`
        //     }
        // }
    )
    .then((response)=>{
        const user = {
            name: response.data.name,
            email: response.data.email,
            created_at: response.data.created_at
        }
        commit('data', user)
        console.log(response)
    }).catch((error)=>{
    console.log(error)
  })
    
}

export const register = ({ commit }, form) => {
   console.log(form)
    axios.post(
     'http://127.0.0.1:8000/api/auth/register',
     {
         name: form.name,
         email: form.email,
         password: form.password,
         device_name: "vue"
    }
     ).then((response) => {
         console.log(response);
         commit('token', response.data.token)
             const user = {
                 name: response.data.name,
                 email: response.data.email,
                 created_at: response.data.created_at
             }
        commit('data', user)
        Toastify({
            text: response.data.message,
            backgroundColor: "#1FDF70",
            className: "error",
        }).showToast();
    }).catch((error) => {
        
        Toastify({
            text: error.response.data.message,
            backgroundColor: "#c0392b",
            className: "error",
        }).showToast();
    }); 
}



export const logout = ({ commit, state }) => {
    const token = state.user.token;
        if (!token) {
            return;
        }

        axios.post(
        'http://127.0.0.1:8000/api/auth/logout', {}, {
            headers: {
            'Authorization': `Bearer ${token}` 
        }
        }).then((response) => {
            console.log(response);
            
            window.localStorage.removeItem("token", token)

            // window.location.href = "/";
            Toastify({
                text: "vous êtes bien déconnecté",
                backgroundColor: "#c0392b",
                className: "error",
            }).showToast();


        }).catch((error) => {
            console.log(error)
        }); 
        commit('token', null);
        commit('data', {});
}

export const createTask =({commit}, data) =>{
    axios.post(
        'http://127.0.0.1:8000/api/tasks', data
        ).then((response) => {
            
            console.log(response);

            commit('token', response.data.token)
            
            const task = {
                body: response.data.body,
            }
            commit('data', task)
            
            Toastify({
                text: response.data.message,
                backgroundColor: "#1FDF70",
                className: "success",
              }).showToast();

        }).catch((error) => {
            console.log(error.response.data.message)
            Toastify({
                text: error.response.data.message,
                backgroundColor: "#c0392b",
                className: "error",
              }).showToast();
        }); 
}

export const updateTask =({ commit}, data ) =>{
    axios.put(
        `http://127.0.0.1:8000/api/tasks/${data.id}`, Object.assign({}, data)


        ).then((response) => {
            
            console.log(response);

            commit('token', response.data.token)
            
            const task = {
                body: response.data.body,
                done: response.data.done,
            }
            commit('data', task)
            
            console.log(response);
            Toastify({
                text: response.data.message,
                backgroundColor: "#1FDF70",
                className: "error",
              }).showToast();

        }).catch((error) => {
            Toastify({
                text: error.response.data.message,
                backgroundColor: "#c0392b",
                className: "error",
            }).showToast();
        }); 
}

export const listTask =({commit}) =>{
    axios.get(
        'http://127.0.0.1:8000/api/auth/tasks'
        ).then((response) => {
            console.log(response);
            commit('tasks', response.data.tasks)
        }).catch((error) => {
            console.log(error.response.data.message)
            Toastify({
                text: error.response.data.message,
                backgroundColor: "#c0392b",
                className: "error",
              }).showToast();
        }); 
}

export const deleteTask =({commit}, id) =>{
    axios.delete(
        `http://127.0.0.1:8000/api/tasks/${id}`        
        ).then((response) => {
            console.log(response);
            commit('tasks', response.data.tasks)
            Toastify({
                text: response.data.message,
                backgroundColor: "#1FDF70",
                className: "error",
              }).showToast();

        }).catch((error) => {
            console.log(error.response.data.message)
            Toastify({
                text: error.response.data.message,
                backgroundColor: "#c0392b",
                className: "error",
              }).showToast();
        }); 
}


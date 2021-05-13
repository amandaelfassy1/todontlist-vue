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
            console.log(response.data.token)
            commit('token', response.data.token)
            axios.defaults.headers["Authorization"] = "Bearer " + response.data.token;

            const user = {
                name: response.data.name,
                email: response.data.email,
                created_at: response.data.created_at
            }
        
            commit('data', user)

       }).catch((error) => {
            console.log(error.response.data.message)
            return{
                error: error.response.data.message
            }

       }); 
}

// export const me = ({commit}, state)=>{
//     const token = state.user.token;
//     if(!token){
//         return;
//     }

//     axios 
//     .post(
//         `http://127.0.0.1:8000/api/auth/me`, 
//         { 
//             headers :{
//                 'Authorization' :`Bearer ${token}`
//             }
//         }
//     )
//     .then((response)=>{
//     console.log(response)
//     }).catch((error)=>{
//     console.log(error)
//   })
    
// }

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
    }).catch((error) => {
        
        alert(error.response.data)

        console.log(error.response.data)
        return{
            alert :
            {
                success: false,
                danger: true,
                message: error.response.data
            }
        }
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

        }).catch((error) => {
            console.log(error.response.data.message)
            Toastify({
                text: "This is a toast",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                className: "info",
                message: error.response.data.message
              }).showToast();
        }); 
}

export const updateTask =({ commit},id, form ) =>{
    axios.post(
        `http://127.0.0.1:8000/tasks/${id}`,
        {
            body: form.body,
            done : form.done
        }
        ).then((response) => {
            
            console.log(response);
            commit('tasks', response.data.tasks)

        }).catch((error) => {
            Toastify({
                text: "This is a toast",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                className: "info",
                message: error.response.data.message
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
    axios.get(
        `http://127.0.0.1:8000/api/auth/delete/${id}`        
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


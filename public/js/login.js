
form.addEventListener('submit' ,()=>{
    const login = {
        email:email.value,
        password:password.value
    }
fetch('/api/login',{
    method:'post',
    body:JSON.stringify(login),
    headers:{
        'Content-Type':'application/json'
    }   
}).then(res => res.json())
    .then(data =>{
        if(data.status =='error'){
            success.style.display = 'none'
            error.style.display = 'block'
            error.innerText = data.error
        }else{
            success.style.display = 'block'
            error.style.display = 'none'
            success.innerText = data.success
            // setTimeout(window.location.assign('/'),10000000)
            setTimeout(function(){location.href="/"} , 1000);   

            // error.innerText = JSON.stringify(data)
        }
    })



})

// form.addEventListener('submit' ,()=>{
//     const login = {
//         email:email.value,
//         password:password.value
//     }
// fetch('/api/login',{
//     method:'post',
//     body:JSON.stringify(login),
//     headers:{
//         'Content-Type':'application/json'
//     }   
// }).then(res => res.json())
//     .then(data =>{
//         if(data.status =='error'){
//             success.style.display = 'none'
//             error.style.display = 'block'
//             error.innerHTML = data.error
//         }else{
//             error.style.display = 'none'
//             success.style.display = 'bolck'
//             success.innerHTML = data.success
            
//         }
//     })



// })
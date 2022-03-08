
form.addEventListener('submit', () => {
    const register = {
        email: email.value,
        password: password.value
    }
    fetch('/api/register', {
        method: 'post',
        body: JSON.stringify(register),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.status == 'error') {
                success.style.display = 'none'
                error.style.display = 'block'
                error.innerText = data.error
            } else {
                success.style.display = 'block'
                error.style.display = 'none'
                success.innerText = data.success
                setTimeout(function(){location.href="/login"} , 1000);   

                // error.innerText = JSON.stringify(data)
            }
        })



})
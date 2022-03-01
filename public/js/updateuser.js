
form.addEventListener('submit', () => {
    const updateuser = {
        email: email.value,
        password: password.value
    }
    fetch('/api/updateuser', {
        method: 'post',
        body: JSON.stringify(updateuser),
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
                setTimeout(function () { location.href = "/" }, 1000);

                // error.innerText = JSON.stringify(data)
            }
        })
})
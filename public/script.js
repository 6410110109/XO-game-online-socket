const save_name = () => {
    let name = document.getElementById('name').value
    if(name === null || name.trim() === ""){
        return
    }

    axios.post('/register' , {name}).then(res => {
        if(res.data.msg === 'ok'){
            window.localStorage.setItem('name' , res.data.data.name)
            window.location.href = '/game'
        }
    })

}
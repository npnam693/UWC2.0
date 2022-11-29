import axios from "axios";
import { useState, useEffect } from 'react';



const Login = () => {
    const [accounts, setAccount] = useState()
    const [username, setEmail] = useState()
    const [password, setPassword] = useState()
    console.log(username, password)
    useEffect(()=>{
        axios.get(`https://638265da281f14ffefa75b07.mockapi.io/accounts`)
            .then(res => {
                setAccount(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = () => {
        accounts.map((account)=> {
            if (accounts.some(account => account.username === username && account.password === password)){
                localStorage.setItem("userInfo", JSON.stringify(account));
            }
            return 0
        })
        const user = JSON.parse(localStorage.getItem("userInfo"))
        if (user) window.location.reload();
        else alert("fail")
    };

    return (
        <div>
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSubmit} className={'btnSubmit'}>Dăng nhap</button>

            <p>
                username: admin
                <br/>
                pass: admin

            </p>
        </div>
    )
}

export default Login
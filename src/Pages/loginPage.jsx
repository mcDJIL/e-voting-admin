import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import client from "../Utils/client";
import { sessionId, sessionName, sessionToken } from "../Constants/localStorage";

export const LoginPage = () => {

    const inputUsername = useRef();
    const inputPassword = useRef();
    const nav = useNavigate();

    const [errorMessage, setErrorMessage] = useState();

    const login = (e) => {
        e.preventDefault();

        let body = {
            username: inputUsername.current.value,
            password: inputPassword.current.value,
        }

        client.post('admin/login', body).then(({data}) => {
            console.log(data);
            localStorage.setItem(sessionId, data.data.id);
            localStorage.setItem(sessionName, data.data.username);
            localStorage.setItem(sessionToken, data.data.token);

            nav('/dashboard');
        }).catch((error) => {
            console.error(error);
            setErrorMessage(error.response.data.message);
        })
    }

    return (
        <>
            <div style={{height: '100vh'}} className="container d-flex justify-content-center align-items-center">
                <div className="login-container">

                    <h3 className='fw-bold text-center mb-4'>Pemilu Damai</h3>

                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}

                <div class="card shadow" style={{width: '26rem'}}>
                    <div class="card-body mx-3">
                        <h5 class="card-title mt-5 mb-4 text-center" style={{fontWeight: '500'}}>Masuk ke dashboard admin</h5>
                        <div class="mb-4">
                            <label for="" class="form-label">Nama Pengguna</label>
                            <input
                                type="text"
                                class="form-control"
                                name=""
                                id=""
                                aria-describedby="helpId"
                                placeholder="Nama Pengguna"
                                ref={inputUsername}
                            />
                        </div>
                        <div class="">
                            <label for="" class="form-label">Kata Sandi</label>
                            <input
                                type="text"
                                class="form-control"
                                name=""
                                id=""
                                aria-describedby="helpId"
                                placeholder="Kata Sandi"
                                ref={inputPassword}
                            />
                        </div>
                        <div className="mt-5 mb-5">
                            <button onClick={login} className="btn w-100 btn-primary" style={{backgroundColor: '#345EA8'}}>Masuk</button>
                        </div>
                        
                    </div>
                </div>
                </div>
                
            </div>
        </>
    )
}
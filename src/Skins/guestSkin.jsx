import { Navigate, Outlet } from "react-router-dom"
import { sessionToken } from "../Constants/localStorage"

export const GuestSkin = () => {
    if (localStorage.getItem(sessionToken) != null) {
        return <Navigate to={'/dashboard'} />
    }

    return (
        <div className="">
            <nav
                class="navbar navbar-expand-lg navbar-light py-3" style={{backgroundColor: '#345EA8'}}
            >
                <div class="container ">
                    <a class="navbar-brand text-white" href={'/dashboard'}>Pemilu Damai</a>
                    <button
                        class="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId"
                        aria-controls="collapsibleNavId"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavId">
                        <ul class="navbar-nav me-auto mt-2 mt-lg-0 ms-5">
                            <li class="nav-item me-4">
                                <a class="nav-link active text-white" href={'/dashboard'} aria-current="page"
                                    >Dashboard
                                    <span class="visually-hidden">(current)</span></a
                                >
                            </li>
                            <li class="nav-item dropdown me-4">
                                <a
                                    class="nav-link dropdown-toggle text-white"
                                    href="#"
                                    id="dropdownId"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >Master Data</a
                                >
                                <div
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownId"
                                >
                                    <a class="dropdown-item" href={'/master-warga'}
                                        >Master Warga Negara</a
                                    >
                                    <a class="dropdown-item" href={'/master-provinsi'}
                                        >Master Provinsi</a
                                    >
                                    <a class="dropdown-item" href={'/master-kota'}
                                        >Master Kota</a
                                    >
                                </div>
                            </li>
                            <li class="nav-item dropdown me-4">
                                <a
                                    class="nav-link dropdown-toggle text-white"
                                    href="#"
                                    id="dropdownId"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >Manajemen Pemilu</a
                                >
                                <div
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownId"
                                >
                                    <a class="dropdown-item" href={'/pemilu-presiden'}
                                        >Manajemen Pemilu Presiden</a
                                    >
                                    <a class="dropdown-item" href={'/master-provinsi'}
                                        >Master Provinsi</a
                                    >
                                    <a class="dropdown-item" href={'/master-kota'}
                                        >Master Kota</a
                                    >
                                </div>
                            </li>
                        </ul>
                        <div class="d-flex my-2 my-lg-0">
                            <a href="" className="text-white text-decoration-none">Login</a>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>  
    )
}
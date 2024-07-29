import { useEffect, useRef, useState } from 'react';
import { FaTrash, FaEdit, FaExclamation } from 'react-icons/fa';
import client from '../Utils/client';

export const MasterProvinsi = () => {

    const [selectProvinsi, setSelectProvinsi] = useState([]);
    const [provinsies, setShowProvinsi] = useState([]);
    const [dataToDelete, setDataToDelete] = useState(null);
    
    const inputProvinsi = useRef();
    const inputProvinsiCreate = useRef();
    
    useEffect(() => {
        client.get('provinsi').then(({data}) => {
            console.log(data);
            setSelectProvinsi(data.data);
        })
    }, []);

    const showProvinsi = (id) => {
        client.get(`provinsi/${id}`).then(({data}) => {
            console.log(data);
            setShowProvinsi(data.data);

            inputProvinsi.current.value = data.data.provinsi
        })
    }

    const addProvinsi = (e) => {
        e.preventDefault();

        let body = {
            provinsi: inputProvinsiCreate.current.value
        }

        client.post('provinsi', body).then(({data}) => {
            console.log(data.message);
            alert(data.message);

            window.location.reload();
        })
    }

    const update = (id) => {
        // ev.preventDefault();

        let body = {
            provinsi: inputProvinsi.current.value
        }

        client.put(`provinsi/${id}`, body).then(({data}) => {
            console.log(data.message);
            alert(data.message);

            window.location.reload();
        })
    }

    const destroy = (id) => {
        setDataToDelete(id);
    }
    
    const confirmDestroy = () => {
        
        client.delete(`provinsi/${dataToDelete}`).then(({data}) => {
            console.log(data.message);
            alert(data.message);

            setDataToDelete(null);
    
            window.location.reload();
        })
    }

    return (
        <div className="container">
            <div class="card mt-5">
                <div class="card-body">
                    <div class="card-title row">
                        <div className="col-12 col-lg-6">
                            <h5>Master Provinsi</h5>
                        </div>
                        <div className="col-12 col-lg-6 text-start text-lg-end">
                            <button style={{backgroundColor: '#345EA8'}} data-bs-toggle="modal" data-bs-target="#modalCreate" className="btn btn-primary">Tambah Provinsi</button>
                        </div>
                    </div>

                    <div
                        class="table-responsive mt-3"
                    >
                        <table
                            class="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col text-center">Provinsi</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {selectProvinsi.map((provinsi) => (
                                    <tr class="">
                                        <td scope="row">{provinsi.id}</td>
                                        <td>{provinsi.provinsi}</td>
                                        <td>
                                            <a href="" onClick={() => showProvinsi(provinsi.id)} className='ms-3 fs-5 text-primary' data-bs-toggle="modal" data-bs-target="#modalEdit"><FaEdit /></a>
                                            <a onClick={() => destroy(provinsi.id)} style={{marginRight: '-150px', cursor: 'pointer'}} className="ms-3 fs-5 text-danger" data-bs-toggle="modal" data-bs-target="#modalDelete"><FaTrash /></a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>

            <div
                class="modal fade"
                id="modalCreate"
                tabindex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                
                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
            >
                <div
                    class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
                    role="document"
                >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitleId">
                                Tambah Data Provinsi
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="" class="form-label">Provinsi</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name=""
                                    id=""
                                    aria-describedby="helpId"
                                    placeholder=""
                                    ref={inputProvinsiCreate}
                                />
                            </div>
                            
                        </div>
                        <div class="modal-footer me-auto">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Kembali
                            </button>
                            <button onClick={addProvinsi} type="button" class="btn btn-primary">Tambah</button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="modal fade"
                id="modalEdit"
                tabindex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                
                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
            >
                <div
                    class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
                    role="document"
                >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitleId">
                                Edit Data Provinsi
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="" class="form-label">Provinsi</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name=""
                                    id=""
                                    aria-describedby="helpId"
                                    placeholder=""
                                    ref={inputProvinsi}
                                />
                            </div>
                            
                        </div>
                        <div class="modal-footer me-auto">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Kembali
                            </button>
                            <button onClick={() => update(provinsies.id)} type="button" class="btn btn-primary">Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                    class="modal fade"
                    id="modalDelete"
                    tabindex="-1"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    
                    role="dialog"
                    aria-labelledby="modalTitleId"
                    aria-hidden="true"
                >
                    <div
                        class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                        role="document"
                    >
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalTitleId">
                                    Yakin ingin menghapus data ini?
                                </h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body mx-auto">
                                <FaExclamation style={{fontSize: '100px'}} className='' />
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button onClick={confirmDestroy} type="button" class="btn btn-primary">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            
            
        </div>
    )
}
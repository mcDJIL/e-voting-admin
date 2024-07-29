import { useEffect, useRef, useState } from 'react';
import { FaTrash, FaEdit, FaEye, FaExclamation } from 'react-icons/fa';
import client from '../Utils/client';
import { useNavigate } from 'react-router-dom';

export const MasterWarga = () => {

    const [members, setMembers] = useState([]);
    const [showMember, setShowMember] = useState([]);
    const [selectProvinsi, setSelectProvinsi] = useState([]);
    const [selectKota, setSelectKota] = useState([]);
    const [dataToDelete, setDataToDelete] = useState(null);

    const inputEmail = useRef();
    const inputDateBirth = useRef();
    const inputProvinsi = useRef();
    const inputKota = useRef();

    useEffect(() => {
        client.get('member').then(({data}) => {
            console.log(data);
            setMembers(data.data)
        })
    }, [])

    useEffect(() => {
        client.get('provinsi').then(({data}) => {
            console.log(data);
            setSelectProvinsi(data.data);
        })
    }, []);

    useEffect(() => {
        client.get('kota').then(({data}) => {
            console.log(data);
            setSelectKota(data.data);
        })
    }, []);

    const infoMember = (id) => {
        client.get(`member/${id}`).then(({data}) => {
            console.log(data.data);
            setShowMember(data.data);
        })
    }

    const banMember = (id) => {
        client.put(`member/ban/${id}`).then(({data}) => {
            console.log(data.message);
            alert(data.message);
        })
    }

    const update = (id) => {
        // ev.preventDefault();

        let body = {
            email: inputEmail.current.value,
            tanggal_lahir: inputDateBirth.current.value,
            provinsi_domisili: inputProvinsi.current.value,
            kota_domisili: inputKota.current.value
        }

        client.put(`member/${id}`, body).then(({data}) => {
            console.log(data.message);
            alert(data.message);

            window.location.reload();
        })
    }

    const destroy = (id) => {
        setDataToDelete(id);
    }
    
    const confirmDestroy = () => {
        
        client.delete(`member/${dataToDelete}`).then(({data}) => {
            console.log(data);
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
                            <h5>Master Warga Negara</h5>
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
                                    <th scope="col">Email</th>
                                    <th scope="col text-center">Tanggal Lahir</th>
                                    <th scope="col">Provinsi Domisili</th>
                                    <th scope="col">Kota Domisili</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {members.map((member) => (
                                    <tr class="">
                                        <td scope="row">{member.email}</td>
                                        <td>{member.tanggal_lahir ?? '-'}</td>
                                        <td>{member.provinsi_domisili ?? '-'}</td>
                                        <td>{member.kota_domisili ?? '-'}</td>
                                        <td>
                                            <a className='fs-5 text-info' onClick={() => infoMember(member.id)} data-bs-toggle="modal" data-bs-target="#modalUser" href=""><FaEye /></a>
                                            <a href="" onClick={() => infoMember(member.id)} className='ms-3 fs-5 text-primary' data-bs-toggle="modal" data-bs-target="#modalEdit"><FaEdit /></a>
                                            <a onClick={() => destroy(member.id)} style={{marginRight: '-150px', cursor: 'pointer'}} className="ms-3 fs-5 text-danger" data-bs-toggle="modal" data-bs-target="#modalDelete"><FaTrash /></a>
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
                id="modalUser"
                tabindex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                
                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
            >
                <div
                    class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
                    role="document"
                >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitleId">
                                Profil Pengguna
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                        <div
                        class="table-responsive mt-3"
                    >
                        <table
                            class="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col text-center">Tanggal Lahir</th>
                                    <th scope="col">Provinsi Domisili</th>
                                    <th scope="col">Kota Domisili</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr class="">
                                        <td scope="row">{showMember.email}</td>
                                        <td>{showMember.tanggal_lahir ?? '-'}</td>
                                        <td>{showMember.provinsi_domisili ?? '-'}</td>
                                        <td>{showMember.kota_domisili ?? '-'}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                            
                        </div>
                        <div class="modal-footer d-flex " style={{justifyContent: 'space-between'}}>
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Kembali
                            </button>
                            <button onClick={() => banMember(showMember.id)} type="button" class="btn btn-danger">Ban</button>
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
                                Edit Data Warga
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
                                <label for="" class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    name=""
                                    id=""
                                    aria-describedby="helpId"
                                    placeholder=""
                                    value={showMember.email}
                                    ref={inputEmail}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    class="form-control"
                                    name=""
                                    id=""
                                    aria-describedby="helpId"
                                    placeholder=""
                                    // value={showMember.tanggal_lahir ?? '-'}
                                    ref={inputDateBirth}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Provinsi Domisili</label>
                                <select ref={inputProvinsi} name="" id="" className="form-control">
                                    <option selected>{showMember.provinsi_domisili ?? '-'}</option>

                                    {selectProvinsi.map((provinsi) => (
                                        <option value={provinsi.provinsi}>{provinsi.provinsi}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Kota Domisili</label>
                                <select ref={inputKota} name="" id="" className="form-control">
                                    <option selected>{showMember.kota_domisili ?? '-'}</option>
                                    {selectKota.map((kota) => (
                                        <option value={kota.kota}>{kota.kota}</option>
                                    ))}
                                </select>
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
                            <button type="button" onClick={() => update(showMember.id)} class="btn btn-primary">Edit</button>
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
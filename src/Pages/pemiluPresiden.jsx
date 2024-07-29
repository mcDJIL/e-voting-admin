import { useEffect, useRef, useState } from 'react';
import pasangan1 from '../Assets/Partai Presiden 1/Presiden (1).png';
import pasangan2 from '../Assets/Partai Presiden 2/Presiden (2).png';
import pasangan3 from '../Assets/Partai Presiden 3/Presiden (3).png';
import client from '../Utils/client';

export const PemiluPresiden = () => {

    const [dataPemilih, setDataPemilih] = useState([]);
    const [dataPasangan, setDataPasangan] = useState([]);

    const selectPasangan = useRef();
    const selectPartai = useRef();

    useEffect(() => {
        client.get('presiden').then(({data}) => {
            console.log(data);
            setDataPemilih(data.data);
        })
    }, [])

    useEffect(() => {
        client.get('pemilu-presiden').then(({data}) => {
            console.log(data);
            setDataPasangan(data);
        })
    }, [])

    const stopPemilu = () => {
        client.put('pemilu-presiden/stop').then(({data}) => {
            console.log(data.message);
            alert(data.message);
        })
    }

    const addPasangan = (e) => {
        e.preventDefault();

        let body = {
            pasangan: selectPasangan.current.value,
            partai: selectPartai.current.value,
        }

        client.post('pemilu-presiden', body).then(({data}) => {
            console.log(data.message);
            alert(data.message)
        })
    }

    return (
        <>
            <div className="container">
                <div className="pemilu mt-5">
                
                    {dataPasangan.length == 0  ? (
                        <div className="start-pemilu text-center">
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pemilu">Mulai Pemilu</button>
                        </div>
                    ) : (
                        <div className="start-pemilu text-center">
                            <button className="btn btn-danger" onClick={stopPemilu}>Stop Pemilu</button>
                        </div>
                    )}

                    {dataPasangan.length == 0 ? null : (
                        <div className="row mt-4">

                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="card">
                                <img src={pasangan1} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">Pasangan No 1</h5>
                                    <p className="card-text">Partai Demokrasi Sejahtera</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="card">
                                <img src={pasangan2} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">Pasangan No 2</h5>
                                    <p className="card-text">Partai Persatuan Rakyat Indonesia</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="card">
                                <img src={pasangan3} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">Pasangan No 3</h5>
                                    <p className="card-text">Partai Rakyat Bersatu Indonesia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )} 
                </div>
            <div class="card mt-5 mb-5">
                <div class="card-body">
                    <div class="card-title row">
                        <div className="col-12 col-lg-6">
                            <h5>Data Pemilih Capres dan Cawapres</h5>
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
                                    <th scope="col">Provinsi Domisili</th>
                                    <th scope="col">Kota Domisili</th>
                                    <th scope="col">Pilihan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPemilih.map((pemilih) => (
                                    <tr class="">
                                        <td>{pemilih.email}</td>
                                        <td>{pemilih.provinsi_domisili}</td>
                                        <td>{pemilih.kota_domisili}</td>
                                        <td>{pemilih.pilihan}</td>
                                    </tr>
                                ))}

                                {dataPemilih.length == 0 ? (
                                    <tr>
                                        <td colSpan={4}>Data pemilih kosong</td>
                                    </tr>
                                ) : null}

                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>

            <div
                class="modal fade"
                id="pemilu"
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
                                Pilih Capres dan Cawapress
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <div className="mb-3">
                                <label className='form-label'>Pasangan No</label>
                                <select ref={selectPasangan} className='form-control'>

                                    <option selected>Pilih No</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Partai</label>
                                <select ref={selectPartai} className='form-control'>
                                    <option selected>Pilih Partai</option>
                                    <option value="Partai Demokrasi Sejahtera">Partai Demokrasi Sejahtera</option>
                                    <option value="Partai Persatuan Rakyat Indonesia">Partai Persatuan Rakyat Indonesia</option>
                                    <option value="Partai Rakyat Bersatu Indonesia">Partai Rakyat Bersatu Indonesia</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Tutup
                            </button>
                            <button onClick={addPasangan} type="button" class="btn btn-primary">Tambah</button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </>
    )
}
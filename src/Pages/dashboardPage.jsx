import PieChart from "../Components/circleChart";
import { sessionName } from "../Constants/localStorage";

export const DashboardPage = () => {

    const date = new Date();

    const name = localStorage.getItem(sessionName);

    return (
        <>
            <section className="date-container pt-5 pb-5">
                <div className="container">
                    <div className="transaksi-header d-flex " style={{justifyContent: 'space-between'}}>
                        <div className="">
                            <h5 className="fw-bold">Selamat Datang, {name}</h5>
                        </div>
                        <div className="">
                            <h5>{date.toLocaleDateString()} | {date.toLocaleTimeString()}</h5>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pie-chart">
                <div className="container">
                    <PieChart />
                </div>
            </section>
        </>
    )
}
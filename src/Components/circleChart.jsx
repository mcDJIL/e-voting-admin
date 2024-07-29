import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import client from '../Utils/client';

const PieChart = () => {

  const [pasangan1, setPasangan1] = useState([]);
  const [pasangan2, setPasangan2] = useState([]);
  const [pasangan3, setPasangan3] = useState([]);

  useEffect(() => {
    client.get('presiden/count').then(({data}) => {
      console.log(data);
      setPasangan1(data.pilihan_1);
      setPasangan2(data.pilihan_2);
      setPasangan3(data.pilihan_3);
    })
  }, []);

  const chartOptions = {
    labels: ['Pasangan 1', 'Pasangan 2', 'Pasangan 3'],
    series: [pasangan1, pasangan2, pasangan3], // Sample data values, you can replace them with your own
    colors: ['#FF6384', '#36A2EB', '#FFCE56'],
    legend: {
      show: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className='mt-5'>
      <h2>Real Count</h2>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="pie" height={350} />
    </div>
  );
};

export default PieChart;

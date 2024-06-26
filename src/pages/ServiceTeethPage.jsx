import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import teethImage from 'src/assets/img/clients/teethStrong.svg';
import TopNavbar from 'src/components/Nav/TopNavbar.jsx';
import { getRequest } from 'src/services/api.js';
import Footer from '../components/Sections/Footer';

function ServiceTeethPage() {
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);

    getRequest('/service/get-all-services')
      .then((res) => {
        setService(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TopNavbar />

      <div className="w-full min-h-screen h-auto p-[0_5rem_5rem_5rem] mt-[80px] flex flex-col gap-5 items-center">
        <p className="font40 extraBold">Service</p>
        <div className="w-full h-auto grid-cols-3 grid grid-rows-fr gap-5">
          {loading
            ? Array.from(new Array(6)).map((_, idx) => (
                <Skeleton key={idx} variant="rounded" animation="wave" className="min-h-[15rem]" />
              ))
            : service.map((val, _) => (
                <div
                  key={val.id}
                  className="rounded-xl min-h-[15rem] shadow-2xl flex flex-col gap-5 items-center justify-center cursor-pointer border-solid border-[#7620ff] border-[2px]"
                >
                  <div className="w-[12rem] h-[6rem]">
                    <img src={teethImage} alt="" className="w-full h-full object-contain" />
                  </div>
                  <p className="font-bold text-[1.2rem]">{val.name}</p>
                </div>
              ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ServiceTeethPage;

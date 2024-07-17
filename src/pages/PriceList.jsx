import { useEffect, useRef, useState } from 'react';
import ContactImg3 from 'src/assets/img/contact-3.png';
import TopNavbar from 'src/components/Nav/TopNavbar.jsx';
import Footer from 'src/components/Sections/Footer.jsx';
import TableCustom from 'src/components/table/CustomTable';
import { cutString } from 'src/sections/user/utils.js';
import { getRequest } from 'src/services/api.js';

function PriceList() {
  const container = useRef(null);

  const [listPrice, setListPrice] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // If you wanna showing this show paper just set the value to true.
  const [turnOff] = useState(false);

  const [paperContent] =
    useState(` This is the text that you want to make the content about the new paper that
                      you adding to your website in the future and if the string is more than 250 character its will calling the cutString function for cuting the string if it is too long`);

  const fetchData = () => {
    getRequest('/service/get-all-services')
      .then((res) => {
        const formattedListPrice = res.data.data.map(row => ({
          ...row,
          price: `${row.price.toLocaleString()} VNĐ`,
        }));
        setListPrice(formattedListPrice);
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  const caroselHandle = () => {
    let scrolls, currentCursor;
    let mouseDown;
    if (!container.current) return;
    container.current.addEventListener('mousedown', (e) => {
      scrolls = container.current.scrollTop;
      currentCursor = e.pageY - container.current.offsetTop;

      mouseDown = true;
    });
    container.current.addEventListener('mouseup', (e) => {
      mouseDown = false;
    });
    container.current.addEventListener('mouseleave', (e) => {
      mouseDown = false;
    });
    container.current.addEventListener('mousemove', (e) => {
      if (!mouseDown) return;
      const realtimeCursor = e.pageY - container.current.offsetTop;
      const moving = (realtimeCursor - currentCursor) * 3;
      container.current.scrollTop = scrolls - moving;
    });
  };

  useEffect(() => {
    let eventStart = true;
    fetchData();
    if (eventStart) {
      caroselHandle();
    }
    return () => {
      eventStart = false;
    };
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="w-full min-h-screen h-auto p-[2rem_5rem_5rem_5rem] mt-[80px] flex gap-5">
        <div className="flex-[2] h-auto flex flex-col gap-5">
          <div className="w-full h-max">
            <p className="text-center font40 extraBold">Our service</p>
          </div>
          <TableCustom
            columns={[
              {
                id: 'name',
                label: 'Service',
                minWidth: 170,
              },
              {
                id: 'description',
                label: 'Description',
                minWidth: 170,
              },
              {
                id: 'expectedDurationInMinute',
                label: 'Time',
                minWidth: 170,
              },
              {
                id: 'price',
                label: 'Price',
                minWidth: 170,
              },
            ]}
            rows={listPrice}
            emptyMessage={errorMessage}
          />
        </div>

        {turnOff ? (
          <div className="flex-[1] h-auto flex flex-col gap-5">
            <p className="text-center font40 extraBold">New paper</p>
            <div className="w-full h-screen overflow-hidden" ref={container}>
              
              <div className="h-max w-full flex flex-col gap-[2rem] select-none">
                {Array.from(new Array(10)).map((_, idx) => (
                  // card
                  <div
                    key={idx}
                    className="w-full min-h-[8rem] flex gap-2 rounded-xl shadow-xl p-[0.5rem] border-solid border-[#707070] border-[1px] cursor-pointer"
                  >
                    <div className="flex-[1] ">
                      <img
                        src={ContactImg3}
                        alt="This is just fake image"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-[3]">
                      <p className="font15 text-justify leading-6 h-max">
                        {paperContent.length > 250 ? cutString(paperContent, 250) : paperContent}
                      </p>
                    </div>
                  </div>
                  // card
                ))}
              </div>
              
            </div>
          </div>
        ) : (
          <div className="flex-[1] h-auto ">
            <div className="sticky top-[5rem] h-max flex flex-col gap-5">
              <div className="w-full h-[15rem] rounded-xl shadow-xl ">
                <img src="./clinic1.png" alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="w-full h-[15rem] rounded-xl shadow-xl">
                <img src="./clinic2.png" alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default PriceList;


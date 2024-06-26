import FullButton from 'src/components/Buttons/FullButton.jsx';
import TopNavbar from 'src/components/Nav/TopNavbar.jsx';
import Footer from 'src/components/Sections/Footer.jsx';

export default function AboutPage() {
  return (
    // wait for confirm and i will splice to alot component
    <>
      <TopNavbar />
      <div className="w-full h-auto p-[0_5rem]">
        <div className="w-full min-h-[10rem] flex mt-[80px] p-[2rem] ">
          <div className="flex-[1] flex items-center pr-[1rem] border-solid border-[#707070] border-r-4">
            <p className="font30 text-end font-bold leading-10 h-max">
              High-Quanlity Market experiences
            </p>
          </div>
          <div className="flex-[2] pl-[1rem] flex items-center border-solid border-[#707070] border-l-4">
            <p className="font15 text-justify leading-6 h-max">
              In today’s competitive healthcare market, our clinic excels in providing top-notch
              medical and dental services. Our skilled professionals use the latest technology to
              meet the growing demand for quality care. Trust dental clinic for innovative
              treatments and compassionate care in a welcoming environment.
            </p>
          </div>
          <div className="flex-[1] flex items-center pl-[2rem]">
            <FullButton title="CONTACT US " action={() => alert('clicked')} />
          </div>
        </div>
        <div className="w-full min-h-[25rem] p-[2rem] flex gap-5">
          <div className="flex-[1] h-[25rem]">
            <img
              src="./clinic1.png"
              alt=""
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div className="flex-[1] flex flex-col items-start gap-2">
            <div className="w-full relative h-[5rem] grid content-start before:bg-red-500 before:content-[''] before:absolute before:w-[10%] before:left-0 before:bottom-0 before:h-[0.3rem] before:bg-[#707070]">
              <h1 className="font40 font-bold space-x-0.5 h-max w-max">SHORT HISTORY</h1>
            </div>
            <p className="font15 text-justify leading-6 h-max">
              At our clinic, we are dedicated to providing exceptional healthcare services with a
              personal touch. Our experienced team offers comprehensive medical care tailored to
              meet your individual needs. From general medicine and pediatrics to women’s health and
              diagnostics, we ensure top-quality treatment in a modern facility equipped with the
              latest technology. With a patient-centered approach and a convenient location, your
              health and well-being are our top priorities. Visit us today and experience
              compassionate, quality care.
            </p>
            <p className="font15 text-justify leading-6 h-max">
              Our commitment to excellence extends beyond medical care. At this clinic, we believe
              in fostering a supportive and welcoming environment where every patient feels valued
              and heard. Our friendly staff is here to guide you through every step of your
              healthcare journey, offering personalized attention and support. We strive to build
              lasting relationships with our patients, ensuring continuity of care and a deeper
              understanding of your health needs. Trust to be your partner in achieving optimal
              health and wellness.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

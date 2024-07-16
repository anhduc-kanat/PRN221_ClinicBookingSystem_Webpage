import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Assets
import LogoImg from "../../assets/svg/Logo";

export default function Footer() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
      //Footer container
    <footer
      class="bg-violet-950 text-center text-white dark:bg-neutral-700 dark:text-white/75 lg:text-left">
      <div
        class="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
        
        <div class="flex justify-center">
          <Link className="pointer flexNullCenter" to="/" smooth={true}>
            <img src="/logo.png" alt="logo" width={60} height={60} viewBox="0 0 80 80" />
            <h1 className="font20 extraBold text-white">
              Dental Clinic
            </h1>
          </Link>
        </div>
      </div>
      <div class="mx-6 py-10 text-center md:text-left">
        <div class="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3 flex justify-evenly">
          <div>
            <h6
              class="mb-4 flex justify-center font-semibold uppercase md:justify-start text-violet-400">
              Feature Services
            </h6>
            <p class="mb-4">
              <a class="text-white">Fluoride Treatments</a>
            </p>
            <p class="mb-4">
              <a class="text-white">Dental Cleanings</a>
            </p>
            <p class="mb-4">
              <a class="text-white">Implants</a>
            </p>
            <p>
              <a class="text-white">Teeth Whitening</a>
            </p>
          </div>

          <div>
            <h6
              class="mb-4 flex justify-center font-semibold uppercase md:justify-start text-violet-400">
              Useful links
            </h6>
            <p class="mb-4">
              <a href="/price" class="text-white">Pricing</a>
            </p>
            <p class="mb-4">
              <a href="/service" class="text-white">Services</a>
            </p>
            <p class="mb-4">
              <a href="/booking" class="text-white">Booking</a>
            </p>
            <p>
              <a href="/about" class="text-white">About</a>
            </p>
          </div>

          <div>
            <h6
              class="mb-4 flex justify-center font-semibold uppercase md:justify-start text-violet-400">
              Contact
            </h6>
            <p class="mb-4 flex items-center justify-center md:justify-start">
              <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path
                    d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </span>
              FPT University
            </p>
            <p class="mb-4 flex items-center justify-center md:justify-start">
              <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path
                    d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </span>
              noreply@fpt.edu.vn
            </p>
            <p class="mb-4 flex items-center justify-center md:justify-start">
              <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clip-rule="evenodd" />
                </svg>
              </span>
              028 7300 5585
            </p>
            <p class="flex items-center justify-center md:justify-start">
              <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
                    clip-rule="evenodd" />
                </svg>
              </span>
              028 7300 5585
            </p>
          </div>
        </div>
      </div>


      <div class="bg-black p-6 text-center">
        <span>© 2024 Copyright</span>
          <h1 className="font15 extraBold">
            Dental Clinic
          </h1>
      </div>
    </footer>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;
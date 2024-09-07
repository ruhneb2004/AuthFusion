"use client";

import Image from "next/image";
import { italiana, pacifico } from "./assets/font";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div className="h-[85vh] flex items-center justify-center p-12">
      <div className="p-7 bg-yellow-200 rounded-2xl shadow-inner shadow-slate-800 w-full h-[70vh] min-w-[450px]">
        <div className="w-full h-full md:flex-row flex flex-col">
          <div className="rounded-xl rounded-r-none overflow-hidden bg-slate-600 w-7/12 relative shadow-lg shadow-black">
            <Image src="/WelcomePage.png" fill alt="A representation of beauty in the chaos" className="object-cover" />
          </div>
          <div className="bg-cyan-600 md:w-5/12 rounded-xl md:rounded-l-none  p-10 flex flex-col justify-center">
            <div
              className={`text-4xl sm:text-5xl md:text-4xl lg:text-4xl xl:text-5xl ${italiana.className} text-white text-center `}
            >
              Welcome to the new <br /> age of verification
            </div>
            <div className="text-center p-3 text-xl text-slate-200 mt-10 tracking-tight leading-tight md:hidden lg:block xl:text-2xl">
              <span className={`${pacifico.className}`}>Secure</span>,{" "}
              <span className={`${pacifico.className}`}>seamless</span>, and{" "}
              <span className={`${pacifico.className}`}>user-friendly</span> authentication solutions bridging the gap
              between Web2 and Web3.Join us on a journey to a more connected and secure digital world.
            </div>
            <div className="flex justify-center mt-14 ">
              {/* Modal 1 => Daisy UI */}
              <dialog id="my_modal_5" className="modal ">
                <div className="modal-box w-8/12 max-w-5xl ">
                  <h3 className="font-bold text-2xl">Before Continuing ⛔️</h3>
                  <p className="py-4 text-lg leading-relaxed tracking-wide">
                    The verification process is a one-time process. And this is done by creating an NFT using your gmail
                    account credentials. This NFT will be used to verify your identity on the platform. And once this
                    NFT is generated this cannot be transfered to another account. For you to use your same gmail
                    account in another address you will have to mint this NFT again, which will inturn make this current
                    NFT invalid for further auth purposes!
                  </p>
                  <div className="modal-action flex justify-center mt-6">
                    <form method="dialog">
                      <button
                        className="btn w-72 h-14"
                        onClick={() => {
                          signIn("google", { callbackUrl: "/nftGeneratorPage" });
                        }}
                      >
                        Sign In With Gmail 🗿
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
              <button
                className="bg-amber-500 py-3 px-5 text-xl hover:rounded-lg transition-all hover:shadow-xl active:rounded-none"
                onClick={() => {
                  const modal = document.getElementById("my_modal_5") as HTMLDialogElement | null;
                  modal?.showModal();
                }}
              >
                Join The <span className={`${italiana.className} text-white`}>Revolution</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

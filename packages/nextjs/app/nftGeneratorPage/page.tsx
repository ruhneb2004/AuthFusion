"use client";

import { useState } from "react";
import { anonymousPro } from "../assets/font";
import { BackgroundSvgCircle, BackgroundSvgSomeShape } from "../assets/images/backgroundSvg";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useScaffoldWatchContractEvent, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// import { useGetGmailAuthInfo } from "~~/hooks/scaffold-eth/useGetGmailAuthInfo";

export default function Home() {
  const session = useSession();
  const [sig, setSig] = useState("");
  const [flagAlert, setFlagAlert] = useState(true);
  const [gmailToken, setGmailToken] = useState("");
  const { address } = useAccount();
  const [, setMinting] = useState(false);
  const [flag, setFlag] = useState(false);
  // const accountAddress = useGetGmailAuthInfo();
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("GmailAuthTokenGenerator");

  const getSignature = async () => {
    setFlag(true);

    const response = await axios.post("https://authfusion.vercel.app/api/handler", {
      mes: session.data?.user?.email,
    });
    console.log(response.data);
    setSig(response.data.signature);
    setFlag(false);
  };

  useScaffoldWatchContractEvent({
    contractName: "GmailAuthTokenGenerator",
    eventName: "GmailTokenGenerated",
    // The onLogs function is called whenever a GreetingChange event is emitted by the contract.
    // Parameters emitted by the event can be destructed using the below example
    // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    onLogs: logs => {
      logs.map(log => {
        const senderAddress = log.args[0];
        if (senderAddress === address) {
          setGmailToken(log.args[1]);
        }
        console.log("📡 gmail token created event", senderAddress, gmailToken);
      });
    },
  });

  const convertAddress = (address: string) => {
    return address.slice(0, 15) + "..." + address.slice(-8);
  };

  if (gmailToken && flagAlert) {
    //take me to the next page
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
    modal?.showModal();
    setFlagAlert(false);
  }

  return (
    <div className="">
      <BackgroundSvgCircle className="absolute left-0 z-0 top-10" />
      <BackgroundSvgSomeShape className="absolute right-0 z-0 top-10" />

      <div className={`${anonymousPro.className} flex justify-center items-center mt-16`}>
        <div className="w-6/12 bg-red-200 shadow-[0px_-12px_10px_rgba(0,0,0,0.2)]  h-[75vh] z-30 rounded-[15%] flex flex-col gap-20 justify-center items-center">
          {/* for current email! */}
          <div className="bg-red-300 w-9/12 text-center py-7 rounded-full shadow-inner shadow-gray-500 text-2xl relative">
            <div className=" truncate px-20">{session.data?.user?.email}</div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Gmail!</h3>
                <p className="py-4 text-base">
                  This is the current email you are logged in from. Please double check before minting the nft!
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn outline-none">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Wallet Address!</h3>
                <p className="py-4 text-base">
                  Please double check that this is the intended wallet address you want to use for minting the gmail
                  nft, as duplicates for the nft won&apos;t be available
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn  outline-none">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Successfully Generated NFT for {session?.data?.user?.email}</h3>
                <p className="py-4 text-base">
                  We have generated the NFT for your gmail account. You can now use this NFT to authenticate yourself on
                  web3 and web2 alike.
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn  outline-none">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            <div
              className="absolute top-5 shadow-md  right-8 bg-red-200 rounded-full text-2xl hover:bg-red-100 transition-all btn border-none px-5 py-2"
              onClick={() => {
                const modal = document.getElementById("my_modal_1") as HTMLDialogElement | null;
                modal?.showModal();
              }}
            >
              ?
            </div>
          </div>
          <div className="bg-red-300 w-9/12 text-center py-7 rounded-full shadow-inner shadow-gray-500 text-2xl relative">
            <div className="px-16 truncate">{convertAddress("0xaaaec1a4c9c87320518b003d4ed069d5911b0f52")}</div>
            <div
              className="absolute top-5 shadow-md  right-8 bg-red-200 rounded-full px-5 py-2 transition-all btn border-none hover:bg-red-100 text-2xl"
              onClick={() => {
                const modal = document.getElementById("my_modal_2") as HTMLDialogElement | null;
                modal?.showModal();
              }}
            >
              ?
            </div>
          </div>
          <button
            className={`${sig ? "" : "hidden"} btn bg-green-300 border-none text-xl h-16 px-10`}
            onClick={async () => {
              setMinting(true);
              try {
                const data = await writeYourContractAsync({
                  functionName: "safeMint",
                  args: [session.data?.user?.email || "", sig as `0x${string}`],
                });
                alert(data);
              } catch (e) {
                console.error("Error setting greeting:", e);
              } finally {
                setMinting(false);
              }
            }}
          >
            <span> Get yourself a gmail auth token(NFT)🎉</span>
          </button>
          <button
            className={`btn bg-blue-200 border-none ${sig ? "hidden" : ""} text-xl h-16 px-10`}
            onClick={getSignature}
          >
            <span className={`${flag ? "" : "hidden"} loading loading-infinity loading-lg`}></span>
            <span className={`${flag ? "hidden" : ""}`}>Proceed To Mint NFT? 🤔</span>
          </button>
        </div>
      </div>
    </div>
  );
}

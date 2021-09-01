import React, { useState } from "react";
import Webcam from "react-webcam";

import { ClaimableFilm, InternetCamera } from "@internetcamera/sdk";
import { useWallet } from "@gimmixorg/use-wallet";
import getJsonRpcProvider from "@app/features/getJsonRpcProvider";

const filmAddr = "0x86Ea0993e4Bd77Da229f5597e89eF92f5A66dC7c";

//return a promise that resolves with a File instance
function urltoFile(url: any, filename: string, mimeType: string) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

const camParams = {
  height: 720,
  width: 1080,
};

const Booth = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const { account, provider } = useWallet();

  const [photo, setPhoto] = useState("");
  const [filmClaimed, setFilmClaimed] = useState(false);

  const claimFilm = () => {
    if (account && provider) {
      const jsonRpcProvider = getJsonRpcProvider();
      const claimableFilm = new ClaimableFilm(filmAddr, {
        provider,
        jsonRpcProvider,
      });

      claimableFilm
        .claimFilmGasless(account)
        .then((data) => {
          console.log("claimed film", data);
          setFilmClaimed(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const capture = React.useCallback(() => {
    console.log(account, provider);

    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      if (imageSrc) {
        setPhoto(imageSrc);

        urltoFile(imageSrc, "image.jpeg", "image/jpeg").then((image) => {
          const jsonRpcProvider = getJsonRpcProvider();
          const cam = new InternetCamera({ provider, jsonRpcProvider });

          if (account) {
            cam
              .postPhotoGasless(image, filmAddr, camParams, account)
              .then((receipt) => {
                console.log(receipt);
              });
          }
          console.log(image);
        });
      }
    }
  }, [webcamRef, account, provider]);

  return (
    <div className="booth">
      <Webcam
        audio={false}
        height={camParams.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={camParams.width}
      />

      <button onClick={capture}>Capture Photo</button>

      <button onClick={claimFilm}>Claim Film</button>
      {filmClaimed ? <h4>You claimed film!</h4> : <></>}

      <img src={photo}></img>

      <style jsx>{`
        .booth {
          display: ${account ? "flex" : "none"};
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Booth;

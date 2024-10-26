import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../../public/anim.json"
const Loader = () => {
  return (
    <div>
      <Player
        src={Animation}
        className="player"
        loop={true}
        autoplay={true}
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
};

export default Loader;

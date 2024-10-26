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
        style={{ height: "500px", width: "500px" }}
      />
    </div>
  );
};

export default Loader;

import React, { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const Clip = () => {
  const textRef = useRef("");
  const [txt, setTxt] = useState("");
  return (
    <div className="my-8">
      <form>
        <textarea
          ref={textRef}
          onChange={() => setTxt(textRef.current.value)}
          className="input input-bordered textarea"
        ></textarea>
      </form>
      <p>{txt}</p>
      <CopyToClipboard text={txt}>
        <button className="btn btn-sm">Copy</button>
      </CopyToClipboard>
    </div>
  );
};

export default Clip;

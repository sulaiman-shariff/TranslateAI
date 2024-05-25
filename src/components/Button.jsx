import React from "react";

const Button = ({ styles }) => (
  <div>
    <a href="src/Analyze.html" target="_blank">
      <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
        Analyse
      </button>
    </a >
    <a href="src/convert.html" target="_blank">
    <button type="button" className={`ml-4 py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
      Convert
    </button>
    </a>
 </div>
 
 
);

export default Button;

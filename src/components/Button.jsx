import React from "react";

const Button = ({ styles }) => (
  <div>
    
    <a href="src/convert.html" target="_blank">
    <button type="button" className={`ml-4 py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
      Try now!
    </button>
    </a>
 </div>
 
 
);

export default Button;

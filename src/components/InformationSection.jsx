import styles from "../style";
import { discount } from "../assets";

const InformationSection = () => {
  return (
    <section id="information" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      {/* Step 1 */}
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">Tier 1</span> 
          </p>
        </div>
        <h2 className="font-poppins font-semibold text-[32px] text-white mb-4">Free tier</h2>
        <p className={`${styles.paragraph} text-white max-w-[470px]`}>
          Access to the analysis tool (limited to 30k token) and conversion tools (limited to 10k tokens).
        </p>
      </div>

      {/* Step 2 */}
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mt-10 md:mt-0`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">Tier 2</span>
          </p>
        </div>
        <h2 className="font-poppins font-semibold text-[32px] text-white mb-4">Standard user($100/m)</h2>
        <p className={`${styles.paragraph} text-white max-w-[470px]`}>
          Providing analysis and conversion tools with added features upto 10k Lines of code!
        </p>
      </div>

      {/* Step 3 */}
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mt-10 md:mt-0`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">Tier 3</span>
          </p>
        </div>
        <h2 className="font-poppins font-semibold text-[32px] text-white mb-4">Enterprise user($1000/m)</h2>
        <p className={`${styles.paragraph} text-white max-w-[470px]`}>
          Upto 110k Lines of code with dedicated support.
        </p>
      </div>

           {/* Step 4 */}
           <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mt-10 md:mt-0`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">Custom</span>
          </p>
        </div>
        <h2 className="font-poppins font-semibold text-[32px] text-white mb-4">Custom pricing</h2>
        <p className={`${styles.paragraph} text-white max-w-[470px]`}>
          Get in touch with us to discuss custom pricing!
        </p>
      </div>

    </section>
  );
};

export default InformationSection;


import styles from "./style";
import { Banner, Footer, Navbar, Hero,  } from "./components";
import InformationSection from "./components/InformationSection";


const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    <div>
      <InformationSection />
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Banner />
        
       

        <Footer />
      </div>
    </div>
  </div>
);

export default App;

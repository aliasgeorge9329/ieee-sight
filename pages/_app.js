import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/authContext";
import { useUserData } from "../lib/authHook";

import "../styles/global.css";
import "../styles/form.css";
import "../styles/HamMenu.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;

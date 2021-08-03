import Navbar from '../components/Header/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/authContext';
import { useUserData } from '../lib/authHook';
import Theme from '../styles/theme';


function App({ Component, pageProps }) {
  
  const userData = useUserData();

  return (
    <UserContext.Provider value={ userData }>  
      <Theme>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </Theme>
    </UserContext.Provider>
  );
  
}

export default App;



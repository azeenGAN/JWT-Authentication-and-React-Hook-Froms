import React, {  useState, useEffect, FC, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from './Signup.tsx';
import Login from './Login.tsx';
import Form from './Form.tsx';
import UserInfo from './UserInfo.tsx';


interface PrivateRouteProps {
  element: React.ReactElement;
}

// Create AuthContext with default values
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value (optional)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const App: FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // To handle loading state
  // const [tokenData, settokenData] = useState<any>(undefined);
  // const [userData, setUserData] = useState<any>(null)

  // let callbackForUserData=(a:any):void=>{
  //   setUserData(a)
  // }

  const fetchProtectedData = async (): Promise<void> => {
    const token = localStorage.getItem('JWT_Token'); // Retrieve the token from local storage   
  
    try {
      const response = await fetch('http://localhost:3000/protected', {
        method: 'GET',
        headers: {
          'Authorization': token || '', // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) { // Check if the response is successful         
        setIsAuthenticated(true); 
      //  settokenData(await response.json())
       }
       else {
        setIsAuthenticated(false);        
      }
    } catch (error:any) {
      console.error(error.message);
      setIsAuthenticated(false);
    }finally {
      setLoading(false); // Set loading state to false
         
    }
  };

  

  // Use auth.token as dependency
  // let yeah= ()=>{
  //   if(tokenData !==undefined)
  //   console.log("this is new yeah func", tokenData.user.user._id)
  // }
  

  const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {  
   
    useEffect(() => {
      fetchProtectedData()
    }, []);

    let location = useLocation();

    
    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }
    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/login" replace state={{ from: location}} />
    );
  };
  
  return (
    <>
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Form/>}  />} />
          <Route path="/userinfo" element={<PrivateRoute element={<UserInfo />} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </AuthContext.Provider>

    </>
  );
};

export default App;

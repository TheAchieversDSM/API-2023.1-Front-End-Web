import {
    useState,
    ReactNode,
    useEffect,
    useContext,
    createContext,
    Dispatch,
    SetStateAction,
  } from "react";
  import Cookies from "js-cookie";
  
  import { useNavigate } from "react-router-dom";
  
  import { setCookie, parseCookies } from "nookies";
  import axios from "axios";
  
  interface SignInProps {
    email: string;
    password: string;
  }
  
  interface AuthContextData {
    signOut: () => void;
    isAuthenticated: boolean;
    user: IUser | undefined;
    setUser: Dispatch<SetStateAction<IUser | undefined>>;
    signIn: (credentials: SignInProps) => Promise<void>;
  }
  
  type AuthProviderProps = {
    children: ReactNode;
  };
  interface IUser {
    nome: string;
    email: string;
    token: string;
    user_id: number;
  }
  export const AuthContext = createContext({} as AuthContextData);
  
  export function signOut() {
    Cookies.remove("tecsus.token");
    Cookies.remove("tecsus.user_id");
  }
  
  export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUser>();
  
    const isAuthenticated = !!user;
  
    async function signIn({ email, password }: SignInProps) {
      try {
        const { data } = await axios.post<IUser>("http://localhost:5000/login", {
          email: email,
          password: password,
        });
  
        setCookie(null, "tecsus.token", data.token as string, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
  
        setCookie(null, "tecsus.user_id", String(data.user_id), {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
  
        setUser(data);
      } catch (error) {
        alert("Parece que o usuário ou senha está incorreta.");
        console.log(error);
      }
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          signIn,
          signOut,
          setUser,
          isAuthenticated,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    return useContext(AuthContext);
  }
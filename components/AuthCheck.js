import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/authContext";

const AuthCheck = (props) => {
    const { username } = useContext(UserContext);

    return (  
        username ? props.children : props.fallback || <Link href="/enter">Please Sign In</Link>
    );
}
 
export default AuthCheck;
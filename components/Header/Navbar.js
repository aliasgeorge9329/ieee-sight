/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/authContext';
import { Button } from '../../styles/GlobalComponentSTyles/ComponentStyles';
import { NavContaier, NavImg } from './NavbarStyles';

const Navbar = () => {
    const { user, username } = useContext(UserContext);

    return (  
        <NavContaier>
            <li>
                <Link href="/" passHref>
                    <a>Interface</a>
                </Link>
            </li>

            <li>
                <Link href="/" passHref>
                    <a>Blogs</a>
                </Link>
            </li>
    

            {/* if the user has a username */}
            {username && (
                <>
                    <li>
                        <Link href="/admin" passHref>
                            <Button>Write Post</Button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${username}`} passHref><NavImg src={user.photoURL} alt="User Image"/>
                        </Link>
                    </li>
                </>
            )}

            {!username && (
                <li>
                    <Link href="/auth" passHref>
                        <Button>Log In</Button>
                    </Link>
                </li>
            )}
        </NavContaier>
    );
}
 
export default Navbar;
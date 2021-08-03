/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/authContext';
import { Button } from '../../styles/GlobalComponentSTyles/ComponentStyles';
import { NavContaier, LogoDiv, MiddleDiv, RightDiv, NavLink, NavImg, Logo } from './NavbarStyles';

const Navbar = () => {
    const { user, username } = useContext(UserContext);

    return (  
        <NavContaier>
            <LogoDiv>
                <Link href="/" passHref>
                    <a><Logo>Interface</Logo></a>
                </Link>
            </LogoDiv>
    
            <MiddleDiv>
                <li>
                    <Link href="/blog" passHref>
                        <NavLink>Blogs</NavLink>
                    </Link>
                </li>
                <li>
                    <Link href="/about" passHref>
                        <NavLink>About Us</NavLink>
                    </Link>
                </li>
            </MiddleDiv>
            {/* if the user has a username */}
            {username && (
                <RightDiv>
                    <li>
                        <Link href="/admin" passHref>
                            <Button>Write Post</Button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${username}`} passHref><NavImg src={user.photoURL} alt="User Image"/>
                        </Link>
                    </li>
                </RightDiv>
            )}

            {!username && (
                <RightDiv>
                    <Link href="/auth" passHref>
                        <Button>Log In</Button>
                    </Link>
                </RightDiv>
            )}
        </NavContaier>
    );
}
 
export default Navbar;
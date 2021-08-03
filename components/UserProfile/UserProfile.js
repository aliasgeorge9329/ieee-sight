/* eslint-disable @next/next/no-img-element */
import { UserProfileSection ,UserProfileImg } from "./UserProfileStyles";

export default function UserProfile({ user }){
    return(
        <UserProfileSection>
            <UserProfileImg src={user.photoURL} alt="UserImage" />
            <p><span>@{user.username}</span></p>
            <h1>{user.displayName}</h1>
        </UserProfileSection>
    );
}
import styled from "styled-components";

export const UserProfileSection = styled.section`
    margin: 20px 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba( 244, 237, 237, 0.35 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 6.5px );
    -webkit-backdrop-filter: blur( 6.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
`
export const UserProfileImg = styled.img`
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
    z-index: 99;
`
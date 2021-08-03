import styled from "styled-components";

export const NavContaier = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 2rem;
    padding: 1rem;
    padding-top: 2rem;
    max-width: 1280px;
    margin: 0 auto;
    
    @media ${(props) => props.theme.breakpoints.sm} {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 60px);
        grid-column-gap: 0.5rem;
        grid-row-gap: 0.5rem;
    }
`
export const LogoDiv = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    @media ${(props) => props.theme.breakpoints.sm} {
        grid-area: 1 / 1 / 2 / 3;
    }
`
export const Logo = styled.div`
    font-size: 3rem;
`
export const MiddleDiv = styled.div`
    grid-area: 1 / 2 / 2 / 4;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media ${(props) => props.theme.breakpoints.sm} {
        grid-area: 2 / 2 / 3 / 5;
        grid-row-gap: 1rem;
    }
`
export const RightDiv = styled.div`
    grid-area: 1 / 5 / 2 / 6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media ${(props) => props.theme.breakpoints.sm} {
        align-items: center;
        grid-area: 1 / 4 / 2 / 6;
    }
`
export const NavLink = styled.a`
    font-size: 2rem;
    line-height: 32px;
    transition: 0.4s ease;
    margin-top: 8px;
    &:hover {
        color: blue;
        opacity: 1;
        cursor: pointer;
    }
    @media ${(props) => props.theme.breakpoints.sm} {
        padding: 0.5rem;
    }
`

export const NavImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
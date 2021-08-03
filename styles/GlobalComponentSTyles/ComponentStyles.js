import styled from "styled-components";

export const Section = styled.section`
    display: ${(props) => props.grid ? "grid" : "flex" };
    flex-direction: ${(props) => props.row ? "row" : "column"};
    padding: ${(props) => props.nopadding ? "0" : "20px"};
    margin: 0 auto;
    max-width: 1040px;
    box-sizing: content-box;
    position: relative;
    overflow: hidden;
    grid-template-columns: 1fr 1fr;
    height: ${(props) => props.hero ? "100vh" : "fit-content"};

    @media ${(props) => props.theme.breakpoints.md} {
        flex-direction: column;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        flex-direction: column;
        width: calc(100vw - 20px);
        padding: ${(props) => props.nopadding ? "0" : "10px"};
    }
`

export const SectionTitle = styled.h2`
    font-family: ${(props) => props.theme.fonts.title};
    font-weight: 800;
    font-size: ${(props) => props.main ? "65px" : "52px"};
    line-height: ${(props) => props.main ? '72px' : '56px'};
    width: max-content;
    --webkit-background-clip: text;
    --webkit-text-fill-color: transparent;
    margin-bottom: 15px;
    padding: ${(props) => props.main ? "50px 0 16px" : "0"};

    @media ${(props) => props.theme.breakpoints.md} {
        font-size: ${(props) => props.main ? "56px" : "48px"};
        line-height: ${(props) => props.main ? '56px' : '48px'};
        margin-bottom: 10px;
        padding: ${(props) => props.main ? "40px 0 12px" : "0"};
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 32px;
        line-height: 40px;
        font-size: ${(props) => props.main ? "32px" : "28px"};
        line-height: ${(props) => props.main ? "32px" : "40px"};
        margin-bottom: 8px;
        padding: ${(props) => props.main ? "15px 0 10px" : "0"};
        max-width: 100%;
    }
`
export const SectionText =styled.p`
    max-width: 800px;
    font-size: 24px;
    line-height: 40px;
    font-weight: 300;
    padding-bottom: 3rem;
    color: grey;

    @media ${(props) => props.theme.breakpoints.md} {
        max-width: 670px;
        font-size: 20px;
        line-height: 32px;
        padding-bottom: 24px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 16px;
        line-height: 24px;
        padding-bottom: 16px;
    }
`
export const SectionSubText = styled.p`
    max-width: 800px;
    font-size: 18px;
    font-weight: 300;
    line-height: 32px;
    color: grey;

    @media ${(props) => props.theme.breakpoints.md} {
        max-width: 670px;
        font-size: 16px;
        line-height: 25px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 14px;
        line-height: 22px;
    }
`
export const Button = styled.button`
    background: rgba( 17, 14, 14, 0.40 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 6.5px );
    -webkit-backdrop-filter: blur( 6.5px );
    border-radius: 10px;
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
`
export const Conatiner = styled.main`
    max-width: 1280px;
    margin: 0 auto;
`

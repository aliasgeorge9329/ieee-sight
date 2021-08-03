/* eslint-disable @next/next/no-img-element */
import { Section, SectionTitle, SectionText } from "../../styles/GlobalComponentSTyles/ComponentStyles";
import { LeftSection, RightContainer } from "./HeroStyles";

const Hero = (props) => {
    return (  
        <Section  row nopadding>
            <LeftSection>
                <SectionTitle main>
                    Interface <br />
                    Community
                </SectionTitle>
                <SectionText>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s
                </SectionText>
            </LeftSection>
            <RightContainer>
                <img style={{maxWidth: "520px", maxHeight: "520px"}} src="/Hero.png" alt="Hero Image" />
            </RightContainer>
        </Section>
    );
}
 
export default Hero;
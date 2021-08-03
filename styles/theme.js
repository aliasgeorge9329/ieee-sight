import { ThemeProvider } from "styled-components";
import theme from '../themes/defaultThemes';
import GlobalStyles from '../styles/GlobalStyles/GlobalStyles';

const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        { children }
    </ThemeProvider>
);

export default Theme;
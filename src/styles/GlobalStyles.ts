import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { customReset } from './customReset';

const GlobalStyle = createGlobalStyle`
${customReset}
${reset}
`;

export default GlobalStyle;

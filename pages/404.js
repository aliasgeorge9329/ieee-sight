import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '../styles/GlobalComponentSTyles/ComponentStyles'

const Main = styled.main`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default function Custom404() {
  return (
    <Main>
      <h1>It&apos;s 404 baby😏</h1>
      <iframe
        src="https://giphy.com/embed/5nmobhwPiNsKELWk69"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/" passHref>
        <Button>Go home</Button>
      </Link>
    </Main>
  );
}

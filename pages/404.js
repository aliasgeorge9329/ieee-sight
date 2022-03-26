import Link from "next/link";
export default function Custom404() {
  return (
    <main>
      <div className="vh-100 flex-center flex-col">
        <h1>It&apos;s 404 baby😏</h1>
        <Link href="/" passHref>
          <button>Go home</button>
        </Link>
      </div>
    </main>
  );
}

import Link from 'next/link'
export default function Custom404() {
	return (
		<main>
			<div className='vh-100 flex-center flex-col'>
				<h1>It&apos;s 404 baby😏</h1>
				<iframe src='https://giphy.com/embed/5nmobhwPiNsKELWk69' width='480' height='362' frameBorder='0' allowFullScreen></iframe>
				<Link href='/' passHref>
					<button>Go home</button>
				</Link>
			</div>
		</main>
	)
}

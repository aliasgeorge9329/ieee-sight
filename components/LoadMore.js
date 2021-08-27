import styles from '../styles/LoadMore.module.css'

export default function LoadMore(props) {
	if (props.postsEnd) return <div></div>
	else if (props.loading)
		return (
			<div className={`${styles['load-more-container']} margin flex-center`}>
				<div className="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		)
	else
		return (
			<div className={`${styles['load-more-container']} margin flex-center`}>
				<button onClick={props.getMorePosts}>Load More</button>
			</div>
		)
}

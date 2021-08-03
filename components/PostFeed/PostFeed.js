import Link from 'next/link';
import styled from 'styled-components';

const BlogBanner = styled.div`
    margin: 10px 10px 10px 10px;
    padding: 10px;
    background-color: aqua;
`

const BannerInfo = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
`

//Admin props for editing the post authored by the currently logged in user
export default function PostFeed({ posts, admin }){
    return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null; 
}

function PostItem({ post, admin = false }){

    //Show the word count in post card.
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount/100+1).toFixed(0);

    return(
        <BlogBanner>
            <Link href={`/${post.username}`} passHref>
                <a>By @{post.username}</a>
            </Link>
            <Link href={`/${post.username}/${post.slug}`} passHref>
                <h2 style={{cursor: 'pointer'}}>{post.title}</h2>
            </Link>
            <BannerInfo>
                <p>{wordCount} words. {minutesToRead} min read</p>
                <p>👏🏻 Clap</p>
            </BannerInfo>
        </BlogBanner>
    );

}
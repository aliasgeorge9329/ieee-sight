import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import { auth, firestore, serverTimestamp, storage } from "../../lib/firebase";
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from '../../styles/GlobalComponentSTyles/ComponentStyles';

const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
`


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';


const AdminPostEdit = (props) => {
    return (
        <AuthCheck>
            <PostEditor />
        </AuthCheck>
    );
}

export default AdminPostEdit;

function PostEditor() {
    const [preview, setPreview] = useState(false);

    const router = useRouter();
    const { slug } = router.query;

    const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);

    const [post] = useDocumentDataOnce(postRef); //Listens to realtime update in post doc 

    return (
        <div>
            {post && (
                <>
                    <section>
                        <h1>{post.title}</h1>
                        <PostForm
                            postRef={postRef}
                            defaultValues={post}
                        />
                    </section>

                </>
            )}
        </div>
    );
}



function PostForm({ defaultValues, postRef }) {

    const { register, handleSubmit, reset } = useForm({ defaultValues, mode: 'onChange' });  //React hook form, function takes in object
    const [article, setArticle] = useState("");


    const updatePost = async ({ published }) => {
        await postRef.update({
            content: article,
            published: published,
            updatedAt: serverTimestamp(),
        });

        reset({ content: article, published: published }); //Resets the form values to the given

        toast.success('Post Updated 🥳');
    };

    // const quillImageHandler = async () => {
    //     const input = document.createElement('input')
    //     input.setAttribute('type', 'file')
    //     input.setAttribute('accept', 'image/*')
    //     const file = input.files[0]
    //     console.log(file)
    //     var storageRef = storage.ref();
    //     var imagesRef = storageRef.child('posts').child('images/' + file);
    //     // var metadata = {
    //     //     contentType: 'image/jpeg'
    //     // };
    //     var uploadTask = await imagesRef.put(file);
    //     console.log("Uploaded successfully!", uploadTask);
    //     const downloadURL = await uploadTask.ref.getDownloadURL();
    //     console.log(downloadURL);
    //     return {
    //         success: 1,
    //         file: {
    //             url: downloadURL
    //         }
    //     }
    // }

    
    var handlerOptions = {
        handlers: {
            // handlers object will be merged with default handlers object
            'link': function (value) {
                if (value) {
                    var href = prompt('Enter the URL');
                    quill.format('link', href);
                } else {
                    quill.format('link', false);
                }
            },
            // image: quillImageHandler
        }
    }
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };


    return (
        <form onSubmit={handleSubmit(updatePost)} >
            <FormDiv>
                <ReactQuill modules={modules} handlers={PostForm.handlerOptions} onChange={(e) => { setArticle(e) }}
                        value={article} />
                <fieldset>
                    <input type="checkbox" {...register("published")} />
                    <label>Publish?</label>
                </fieldset>
                <Button type="submit">Update Changes</Button>
            </FormDiv>
        </form >
    );

}
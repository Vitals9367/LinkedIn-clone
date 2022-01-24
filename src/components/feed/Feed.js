import React, { useEffect, useState } from 'react';
import { collection, query, addDoc, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../../firebase'; 
import './Feed.css';
import FlipMove from 'react-flip-move';

import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

import InputOption from './InputOption';
import Post from './Post';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


const Feed = () => {

    const user = useSelector(selectUser);

    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {

        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, querySnapshot => {

            let tmpList = [];

            querySnapshot.forEach(doc => (
                tmpList.push({
                    id: doc.id,
                    data: doc.data(),
                })
            ));

            setPosts(tmpList);
        })

    },[] )

    const sendPost = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "posts"), {
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || '',
            timestamp: serverTimestamp(),
        });

    }

    return <div className='feed'>
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" />
                    <button onClick={sendPost} type='submit'>Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOption Icon={ImageIcon} title='Photo' color="#70B5F9" />
                <InputOption Icon={SubscriptionsIcon} title='Video' color="#E7A33E" />
                <InputOption Icon={EventNoteIcon} title='Event' color="#C0CBCD" />
                <InputOption Icon={CalendarViewDayIcon} title='Write article' color="#7FC15E" />
            </div>
        </div>
        <FlipMove>
            {posts.map(({id, data:{name, description, message, photoUrl}}) => (
                <Post key={id} name={name} description={description} message={message} photoUrl={photoUrl} />
            ))}
        </FlipMove>
    </div>;
};

export default Feed;

import Post from '../Post';
import { getTimelinePosts } from '~/actions/PostAction';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Stack, Skeleton } from '@mui/material';
import React, { useEffect } from 'react';

const PostList = () => {
    const params = useParams();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.authReducer.authData);

    let { posts, loading } = useSelector((state) => state.postReducer);
    useEffect(() => {
        dispatch(getTimelinePosts(user._id));
    }, [dispatch, user._id]);

    if (!posts) return 'No Posts';

    if (params.id) posts = posts.filter((post) => post.userId === params.id);
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            {loading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text" height={100} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="rectangular" height={300} />
                </Stack>
            ) : (
                <>
                    {posts.map((item, id) => (
                        <Post
                            key={id}
                            idUser={item.userId}
                            time={item.updatedAt}
                            imgURL={item.image}
                            content={item.desc}
                            comments={item.comments}
                            likes={item.likes}
                            idPost={item._id}
                        />
                    ))}
                </>
            )}
        </Box>
    );
};

export default PostList;

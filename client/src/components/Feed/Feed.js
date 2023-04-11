import InputPost from '../InputPost';
import PostList from '../PostList';
import { Box } from '@mui/material';

const Feed = () => {
    return (
        <Box flex={4} sx={{ margin: 3 }}>
            <InputPost />
            <PostList />
        </Box>
    );
};

export default Feed;

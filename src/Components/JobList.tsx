import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useState } from 'react';

function JobList() {
    const selectedFreelancer = useSelector((state: RootState) => state.card.selectedFreelancer);
    const selectedFreelancerPosts = useSelector((state: RootState) => state.card.selectedFreelancerPosts);
    const selectedPostComments = useSelector((state: RootState) => state.card.selectedPostComments);

    const [visibleComments, setVisibleComments] = useState<number | null>(null);

    if (!selectedFreelancer) return null;

    const toggleComments = (postId: number) => { setVisibleComments(visibleComments === postId ? null : postId) };

    return (
        <Card sx={{ padding: 2, marginTop: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div"><strong>List of past jobs</strong></Typography>
                {selectedFreelancerPosts
                    .filter((post: any) => post.userId === selectedFreelancer.id)
                    .map((post: any) => {
                        const commentCount = selectedPostComments.filter((comment: any) => comment.postId === post.id).length;
                        const postComments = selectedPostComments.filter((comment: any) => comment.postId === post.id);

                        return (
                            <Box key={post.id} sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4, marginTop: 2 }}>
                                <Typography variant="h6" component="div">{post.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{post.body}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Number of comments:</strong> {commentCount}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => toggleComments(post.id)}
                                    sx={{ marginTop: 1 }}
                                >
                                    {visibleComments === post.id ? 'Hide Comments' : 'Show Comments'}
                                </Button>

                                {visibleComments === post.id && (
                                    <Box sx={{ marginTop: 2, padding: 1, border: '1px solid #ddd', borderRadius: 4 }}>
                                        {postComments.map((comment: any) => (
                                            <Box key={comment.id} sx={{ marginBottom: 1 }}>
                                                <Typography variant="body2">
                                                    <strong>{comment.name}:</strong> {comment.body}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
            </CardContent>
        </Card>
    );
}

export default JobList;

import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { Card, CardContent, Typography, Box, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetView, saveFreelancer } from './../Redux/cardSlice';
import JobList from './JobList';

function FreelancerDetail() {
    const selectedFreelancer = useSelector((state: RootState) => state.card.selectedFreelancer);
    const isDetailView = useSelector((state: RootState) => state.card.isDetailView);
    const dispatch = useDispatch();

    if (!isDetailView || !selectedFreelancer) return null;

    const { name, email, phone, photo, finishedJobCount, city } = selectedFreelancer;

    const handleSaveFreelancer = () => {
        dispatch(saveFreelancer(selectedFreelancer));
    };

    return (
        <>
            <Card sx={{ padding: 2 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={photo}
                            alt={name}
                            style={{ width: 100, height: 100, borderRadius: 8, marginRight: 16 }} />
                        <Box>
                            <Typography variant="h5" component="div">{name}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>Email:</strong> {email}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>Phone:</strong> {phone}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>City:</strong> {city}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>Finished Jobs:</strong> {finishedJobCount}</Typography>
                            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveFreelancer}
                                >
                                    Save Freelancer
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => dispatch(resetView())}
                                >
                                    Go Back to List
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <JobList />
        </>
    );
}

export default FreelancerDetail;

import { Grid, Button, Card, CardContent } from '@mui/material';
import { cardType } from '../types/Types';
import FreelancerCard from './FreelancerCard';

interface Props {
    cards: cardType[];
    savedFreelancers: cardType[];
    onRemoveFreelancer: (id: number) => void;
    showSaved: boolean;
}

function FreelancerCardListView({ cards, savedFreelancers, onRemoveFreelancer, showSaved }: Props) {
    return (
        <Grid container spacing={2}>
            {cards.map((freelancer) => {

                const isSaved = savedFreelancers.some((savedFreelancer) => savedFreelancer.id === freelancer.id);

                return (
                    <Grid item xs={12} sm={6} md={4} key={freelancer.id}>
                        <Card sx={{ padding: 2 }}>
                            <CardContent>
                                <FreelancerCard cardProps={freelancer} />
                                {showSaved && isSaved && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => onRemoveFreelancer(freelancer.id)}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Delete From Saved
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default FreelancerCardListView;

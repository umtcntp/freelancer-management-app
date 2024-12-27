import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { cardType } from '../types/Types';
import FreelancerFilters from './FreelancerFilters';
import FreelancerCardListView from './FreelancerCardListView';
import { Box, Button } from '@mui/material';
import { removeFreelancer } from './../Redux/cardSlice';
import React from 'react';

function FreelancerCardList() {
    const { cards, savedFreelancers, searchName, minJobs, maxJobs, isDetailView } = useSelector((state: RootState) => state.card);
    const [showSaved, setShowSaved] = React.useState(false);
    const dispatch = useDispatch();

    const freelancersToDisplay = showSaved ? savedFreelancers : cards;

    const filteredCards = freelancersToDisplay.filter((freelancer: cardType) => {
        const matchesName = freelancer.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesMinJobs = minJobs === null || freelancer.finishedJobCount >= minJobs;
        const matchesMaxJobs = maxJobs === null || freelancer.finishedJobCount <= maxJobs;
        return matchesName && matchesMinJobs && matchesMaxJobs;
    });

    if (isDetailView) return null;

    const handleRemoveFreelancerFromSavedList = (id: number) => {
        dispatch(removeFreelancer(id));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowSaved(!showSaved)}
                sx={{ marginBottom: 2 }}
            >
                {showSaved ? 'Show All Freelancers' : 'Show anly saved Freelancers'}
            </Button>
            <FreelancerFilters />
            <FreelancerCardListView
                cards={filteredCards}
                savedFreelancers={savedFreelancers}
                onRemoveFreelancer={handleRemoveFreelancerFromSavedList}
                showSaved={showSaved}
            />
        </Box>
    );
}

export default FreelancerCardList;

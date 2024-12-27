import { useDispatch } from 'react-redux';
import { cardType } from '../types/Types';
import { CardContent, Typography, Avatar, Box } from '@mui/material';
import { selectFreelancer } from '../Redux/cardSlice';


interface CardProps {
    cardProps: cardType
}

function FreeLancerCard({ cardProps }: CardProps) {


    const { name, email, phone, photo, finishedJobCount, city } = cardProps;
    const dispatch = useDispatch();

    const handleCardClick = () => {
        dispatch(selectFreelancer(cardProps));  // Seçilen freelancer'ı dispatch et
    };


    return (
        <>

            <CardContent onClick={handleCardClick} sx={{ cursor: 'pointer', marginBottom: 2 }}>
                <Avatar
                    alt={name}
                    src={photo}
                    sx={{
                        width: 350,
                        height: 150,
                        borderRadius: 2,
                        marginBottom: 2
                    }}
                />
                <Box>
                    <Typography variant="h5" component="div">
                        <strong>Name:</strong> {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Phone:</strong> {phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Finished Job Count:</strong> {finishedJobCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>City:</strong> {city}
                    </Typography>
                </Box>
            </CardContent>

        </>
    )
}

export default FreeLancerCard

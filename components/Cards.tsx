import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { ActionButton } from '@models/action-button';

interface Props {
  cards: {
    title: string;
    img: string;
    description: string;
    action?: ActionButton;
  }[];
}

const Cards = ({ cards }: Props) => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map(card => (
          <Grid item key={card.title} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  pt: '56.25%',
                }}
                image={card.img}
                alt={card.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography>{card.description}</Typography>
              </CardContent>
              <CardActions>
                {card.action && (
                  <Button size="small" onClick={() => card.action?.onClick()}>
                    {card.action.label}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;

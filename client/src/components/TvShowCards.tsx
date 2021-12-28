import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from '@mui/material';

interface TvShowCardInterface {
  children?: never[]
  image: string;
  alt: string;
  title: string;
  paragraph: string;
}

export default function TvShowCards(props: TvShowCardInterface) {
  return (
  <Card
    sx={{maxWidth: 345}}
  >
    <CardActionArea>
        <CardContent>
          <img
          src={props.image}
          width={200}
          >
          </img>
          <Typography variant='h5'>
            {props.title}
          </Typography>
          <Typography variant='body2'>
            {props.paragraph}
          </Typography>
        </CardContent>
    </CardActionArea>
  </Card>
  )
}
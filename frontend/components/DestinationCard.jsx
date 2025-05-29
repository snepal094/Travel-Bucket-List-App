'use client';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const DestinationCard = () => {
  return (
    <Box
      sx={{
        width: '400px',
        boxShadow:
          ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
      }}
    >
      <Image
        src="/chitwan-national-park.jpg"
        height={400}
        width={400}
        alt="Destination image"
      />
      <Box
        sx={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Chitwan National Park</Typography>
          <Chip label="Nepal" color="success" variant="outlined" />
          <Typography variant="h5">Chitwan</Typography>
        </Stack>

        <Typography sx={{ textAlign: 'justify' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, culpa
          sapiente. Quia, alias rerum itaque temporibus eum corrupti tempore
          corporis aut hic cum assumenda officia exercitationem deserunt modi.
          Numquam dicta sed quod ut veniam, voluptatum magnam in tempore,
          laudantium ea facere voluptate pariatur quos voluptatibus! Quia iste
          vitae quos praesentium! ...
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Delete
          </Button>
          <Button
            color="success"
            variant="contained"
            startIcon={<VisibilityOutlinedIcon />}
          >
            View More
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DestinationCard;

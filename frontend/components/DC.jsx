import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import {
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';

const DC = () => {
  return (
    <Box
      sx={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        // background: 'gray',
        // border: '5px solid darkblue',
        boxShadow:
          'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',
      }}
    >
      <Image
        src="/chitwan-national-park.jpg"
        height={400}
        width={400}
        alt="Chitwan National Park Image"
      />
      {/* width is restricted to 400 since the Box width is 400 */}
      {/* wider than 400 gets ignored */}

      <Box sx={{ padding: '1rem' }}>
        <Divider>
          <Typography>CHITWAN NATIONAL PARK</Typography>
        </Divider>

        <Stack
          direction="row"
          padding="1rem"
          justifyContent="center"
          spacing={4} //4*8=32px
        >
          <Chip label="Chitwan" />
          <Chip label="Nepal" />
        </Stack>

        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, culpa
          sapiente. Quia, alias rerum itaque temporibus eum corrupti tempore
          corporis aut hic cum assumenda officia exercitationem deserunt modi.
          Numquam dicta sed quod ut veniam, voluptatum magnam in tempore,
          laudantium ea facere voluptate pariatur quos voluptatibus! Quia iste
          vitae quos praesentium! ...
        </Typography>
      </Box>

      <Stack direction="row" justifyContent="space-between" padding={1}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditOutlined />}
        >
          EDIT
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<VisibilityOutlined />}
        >
          VIEW MORE
        </Button>
        <Button variant="contained" color="error" startIcon={<DeleteOutline />}>
          DELETE
        </Button>
      </Stack>
    </Box>
  );
};

export default DC;

import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import DeleteDestinationDialog from './DeleteDestinationDialog';
import { isEditor } from '@/utils/check.role';
import { useRouter } from 'next/navigation';

const DC = (props) => {
  const router = useRouter();
  const destinationId = props._id;
  return (
    <Box
      sx={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow:
          'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',
      }}
    >
      <Image
        src={props.image || '/chitwan-national-park.jpg'}
        height={400}
        width={400}
        alt="Chitwan National Park Image"
      />

      {/* width is restricted to 400 since the Box width is 400 */}
      {/* wider than 400 gets ignored */}

      <Box sx={{ padding: '1rem' }}>
        <Divider>
          <Typography sx={{ textTransform: 'uppercase' }}>
            {props.name}
          </Typography>
        </Divider>

        <Stack
          direction="row"
          padding="1rem"
          justifyContent="center"
          spacing={4} //4*8=32px
        >
          <Chip label={props.city} />
          <Chip label={props.country} />
        </Stack>

        <Typography sx={{ textAlign: 'justify', overflow: 'hidden' }}>
          {props.description}
        </Typography>
      </Box>

      <Stack direction="row" justifyContent="space-between" padding={1}>
        {isEditor() && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditOutlined />}
          >
            EDIT
          </Button>
        )}

        <Button
          variant="contained"
          color="success"
          startIcon={<VisibilityOutlined />}
          onClick={() => {
            router.push(`/destination/details/${destinationId}`);
          }}
        >
          VIEW MORE
        </Button>
        {/* <Button variant="contained" color="error" startIcon={<DeleteOutline />}>
          DELETE
        </Button> */}
        {isEditor() && (
          <DeleteDestinationDialog destinationId={destinationId} />
        )}
      </Stack>
    </Box>
  );
};

export default DC;

import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { PageTitle, Paragraph, StyledLink, SectionDivider } from 'components/Layout/SharedStyles';
import config from 'config';
const { EVENTS } = config;

export default function Home() {
  return (
    <>
      <Box sx={{ maxWidth: 700 }}>
        <PageTitle>
          Cascade Promenade<br />
          March 3rd &ndash; 10th 2024
        </PageTitle>

        <Box mb={2}>
          <img src={process.env.PUBLIC_URL + '/promenade/cascade-promenade-logo.png'} alt='' style={{ maxWidth: "100%", height: "auto" }} />
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Dance the I-5 Corridor<br />
        </Typography>

        <Paragraph>
          The Iron and Titanium Dancer awards return!
        </Paragraph>

        <Paragraph>
          Dancers who attend at least five dances, including the Portland Roadhouse, can receive an Iron Dancer ribbon at the Portland Roadhouse.
          Dancers who attend at least seven dances, including the Portland Roadhouse, receive the coveted Titanium Dancer ribbon at the Portland Roadhouse.
        </Paragraph>

        <Paragraph>
          To receive your Iron or Titanium Dancer ribbon at the Portland Roadhouse, 
          please print the passport (<StyledLink to={"passport.pdf"}>available here</StyledLink>) 
          and have an organizer or door person initial it at each dance you attend.
          Flyers/passports will be collected and ribbons awarded as you arrive at the Roadhouse. 
          Iron and Titanium dancers will be recognized during band breaks at the Roadhouse. 
          There will also be a drawing for door prizes.
        </Paragraph>

        <SectionDivider />
      </Box>

      <Typography variant='h4' align='center' sx={{ m: 4 }}>
        2024 Schedule
      </Typography>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container spacing={0} sx={{ mt: 4 }}>
          <Grid border='solid' item xs={3}><Typography variant="h6">Day</Typography></Grid>
          <Grid border='solid' item xs={2}><Typography variant="h6">Start</Typography></Grid>
          <Grid border='solid' item xs={2}><Typography variant="h6">End</Typography></Grid>
          <Grid border='solid' item xs={5}><Typography variant="h6">Dance</Typography></Grid>

          {EVENTS.map((event, index) => (
            <React.Fragment key={index}>
              <Grid border='solid' item xs={3}><Typography sx={{p: 2}}>{event.day}</Typography></Grid>
              <Grid border='solid' item xs={2}><Typography sx={{p: 2}}>{event.start}</Typography></Grid>
              <Grid border='solid' item xs={2}><Typography sx={{p: 2}}>{event.end}</Typography></Grid>
              <Grid border='solid' item xs={5}>
                <Box sx={{ p: 2 }}>
                  <StyledLink to={event.url}><Typography>{event.dance}</Typography></StyledLink>
                  <Typography><span dangerouslySetInnerHTML={{ __html: event.location }}></span></Typography>
                </Box>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {EVENTS.map((event, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography>{event.day}</Typography>
            <Typography>{event.start} &ndash; {event.end}</Typography>
            <StyledLink to={event.url}><Typography>{event.dance}</Typography></StyledLink>
            <Typography><span dangerouslySetInnerHTML={{ __html: event.location }}></span></Typography>
          </Box>
        ))}
      </Box>

    </>
  );
}

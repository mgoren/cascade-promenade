import { Typography, Box, } from '@mui/material';
import { StyledPaper, PageTitle, Paragraph } from 'components/Layout/SharedStyles';

export default function Home() {

  return (
    <StyledPaper extraStyles={{ maxWidth: 750 }} align="center">
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
      Schedule and award requirements coming soon...
      </Paragraph>
    </StyledPaper>
  );
}

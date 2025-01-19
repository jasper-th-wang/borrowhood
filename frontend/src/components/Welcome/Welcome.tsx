import { Anchor, Box, Button, Stack, Text, Title, Image } from '@mantine/core';
import borrowerGif from '@/assets/logos/loopborrower.gif';
import classes from './Welcome.module.css';
import { NavLink } from 'react-router-dom';
import welcomeSVG from '@/assets/logos/welcome.svg';

export function Welcome() {
  return (
    <Box className={classes.root}>
      <Stack justify="center" align="center">
        <Image src={welcomeSVG} className={classes.welcomeSVG} />
        <NavLink to="/onboarding" viewTransition>
          <Button mt="md">
            Sign in
          </Button>
        </NavLink>
      </Stack>
      <img src={borrowerGif} alt="" className={classes.borrowerGif} />
    </Box>
  );
}

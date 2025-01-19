import { Anchor, Button, Stack, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { NavLink } from 'react-router-dom';

export function Welcome() {
  return (
    <Stack>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Borrowhood
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi aliquam reiciendis eaque modi officiis rerum unde eveniet earum atque, tenetur praesentium facilis placeat voluptas labore cum nisi quo ipsa.
      </Text>
      <NavLink to="/onboarding" viewTransition>
        <Button>
          Let's Get Started
        </Button>
      </NavLink>
    </Stack>
  );
}

import '@mantine/core/styles.css';
import { IconPhoto, IconMessageCircle, IconSettings, IconHome2 } from '@tabler/icons-react';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MantineProvider, AppShell, Tabs, Button, Flex, NavLink } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
// import classes from '@/App.module.css';

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
          }}
          footer={{ height: 80 }}
          padding="md">
          <AppShell.Header>
            <div>Logo</div>
          </AppShell.Header>
          <Router />
          <AppShell.Footer p="0">
            <Flex
              h="100%"
              justify="center"
              align="center"
              direction="row"
            >
              <NavLink
                h="100%"
                href="#required-for-focus"
                label="Page 1"
                leftSection={<IconHome2 size={16} stroke={1.5} />}
              />
              <NavLink
                h="100%"
                href="#required-for-focus"
                label="Page 2"
                leftSection={<IconHome2 size={16} stroke={1.5} />}
              />
              <NavLink
                h="100%"
                href="#required-for-focus"
                label="Page 3"
                leftSection={<IconHome2 size={16} stroke={1.5} />}
              />
            </Flex>
          </AppShell.Footer>
        </AppShell>
      </MantineProvider>
    </QueryClientProvider>
  );
}

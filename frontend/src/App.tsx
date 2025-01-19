import '@mantine/core/styles.css';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MantineProvider, AppShell, Flex, NavLink, Burger } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';

export default function App() {
  const queryClient = new QueryClient()
  const [opened, { toggle }] = useDisclosure();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AppShell
          header={{
            height: 80
          }}
          footer={{ height: 80 }}
          padding="md">
          <AppShell.Header bg="purple.0">
            <Flex
              gap="md"
              justify="space-between"
              align="center"
              direction="row"
            >
              <div>Logo</div>
              <div>
                <Burger classNames={{
                  root: classes.root
                }} opened={opened} onClick={toggle} aria-label="Toggle navigation" />
              </div>
            </Flex>
          </AppShell.Header>
          <AppShell.Main>
            <Router />
          </AppShell.Main>
          {/* <AppShell.Footer p="0">
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
          </AppShell.Footer> */}
        </AppShell>
      </MantineProvider>
    </QueryClientProvider>
  );
}

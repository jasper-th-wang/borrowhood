import '@mantine/core/styles.css';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MantineProvider, AppShell, Flex, NavLink, Burger, Drawer, Button } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { IconHeartDown, IconHeartShare, IconUsers } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';

const tabs = [
  { link: '', label: 'Share an Item', icon: IconHeartShare },
  { link: '', label: 'Borrow an Item', icon: IconHeartDown },
  { link: '', label: 'Join a Group', icon: IconUsers },
]
export default function App() {
  const queryClient = new QueryClient()
  const [opened, { open, close }] = useDisclosure();
  const handleHamburgerToggle = () => {
    opened ? close() : open();
  }


  const links = tabs.map((item) => (
    <a
      className={classes.link}
      // data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
    // onClick={(event) => {
    //   event.preventDefault();
    // setActive(item.label);
    // }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Router />
        <AppShell
          header={{
            height: 80
          }}
          footer={{ height: 80 }}
          padding="md">
          <Drawer opened={opened} onClose={close} title="Hello!">
            {/* <Button fullWidth>Full width button</Button>
            <Button fullWidth>Full width button</Button>
            <Button fullWidth>Full width button</Button> */}
            <nav className={classes.navbar}>
              <div className={classes.navbarMain}>{links}</div>
            </nav>
          </Drawer>
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
                }} opened={opened} onClick={handleHamburgerToggle} aria-label="Toggle navigation" />
              </div>
            </Flex>
          </AppShell.Header>
          <AppShell.Main>
            <Outlet />
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

import '@mantine/core/styles.css';
import logo from '@/assets/logos/logo.svg'


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MantineProvider, AppShell, Flex, Burger, Drawer } from '@mantine/core';
import { theme } from './theme';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { IconHeartDown, IconHeartShare, IconUsers } from '@tabler/icons-react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { WelcomePage } from './pages/Welcome.page';
import { OnboardingPage } from './pages/Onboarding.page';
import { TestingPage } from './pages/Testing.page';
import { AddItemPage } from './pages/AddItem.page';
import BorrowItemPage from './pages/BorrowItem.page';
import { HomePage } from './pages/Home.page';
import { useAppStore } from './store';

const tabs = [
  { page: "add-item", link: '/add-item', label: 'Share an Item', icon: IconHeartShare },
  { page: "items", link: '/', label: 'Borrow an Item', icon: IconHeartDown },
  { page: "communities", link: '/', label: 'Join a Group', icon: IconUsers },
]
export default function App() {
  const queryClient = new QueryClient()
  const { categoryFocus, setCategoryFocus, mapListFocus, setMapListFocus } = useAppStore();
  const [opened, { open, close }] = useDisclosure();
  const handleHamburgerToggle = () => {
    opened ? close() : open();
  }
  const navigate = useNavigate();


  const links = tabs.map((item) => (
    <a
      className={classes.link}
      href={item.link}
      key={item.label}
      onClick={(e) => {
        e.preventDefault();
        navigate(item.link);
        if (item.page === "items") {
          setCategoryFocus("items");
          setMapListFocus("list");
        }
        if (item.page === "communities") {
          setCategoryFocus("communities");
          setMapListFocus("list");
        }
        close();
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AppShell
          header={{
            height: 80

          }}
          footer={{ height: 80 }}
          padding={{
            base: 15,
          }}>
          <Drawer opened={opened} onClose={close} title="Hello!">
            <nav className={classes.navbar}>
              <div className={classes.navbarMain}>{links}</div>
            </nav>
          </Drawer>
          <AppShell.Header bg="purple.0" px={{
            base: 15,
            sm: 40,
            md: 120
          }}>
            <Flex
              gap="md"
              justify="space-between"
              align="center"
              direction="row"
            >
              <NavLink to="/">
                <img src={logo} alt="logo" className={classes.logo} />
              </NavLink>
              <div>
                <Burger classNames={{
                  root: classes.root
                }} opened={opened} onClick={handleHamburgerToggle} aria-label="Toggle navigation" />
              </div>
            </Flex>
          </AppShell.Header>
          <AppShell.Main bg="purple.1"
            px={{
              base: 15,
              sm: 40,
              md: 120
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/testing" element={<TestingPage />} />
              <Route path="/add-item" element={<AddItemPage />} />
              <Route path="/borrow-item" element={<BorrowItemPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </QueryClientProvider>
  );
}

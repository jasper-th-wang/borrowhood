// import apiClient from '@/repositories/apiClient';

import { Community } from "@/components/Cards/CommunityCard/Community.interface";

const stubGetCommunitiesResponse = [
  {
    id: "c1",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "15.4K",
    communityName: "Tech Innovators Hub"
  },
  {
    id: "c2",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "8.2K",
    communityName: "Urban Gardeners Connect"
  },
  {
    id: "c3",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "23.7K",
    communityName: "Fitness Warriors"
  },
  {
    id: "c4",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "5.9K",
    communityName: "Global Book Club"
  },
  {
    id: "c5",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "12.3K",
    communityName: "Digital Art Collective"
  },
  {
    id: "c6",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "19.8K",
    communityName: "Foodie Adventures"
  },
  {
    id: "c7",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "31.2K",
    communityName: "Pet Parents Society"
  },
  {
    id: "c8",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "27.5K",
    communityName: "Global Travelers Network"
  },
  {
    id: "c9",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "11.6K",
    communityName: "Music Makers United"
  },
  {
    id: "c10",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "16.8K",
    communityName: "Eco Warriors Alliance"
  }
];
export async function getCommunities(): Promise<Community[]> {
  // return Promise.resolve(stubGetCommunitiesResponse)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stubGetCommunitiesResponse);
    }, 2000);
  })
}
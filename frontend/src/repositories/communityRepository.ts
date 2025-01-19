// import apiClient from '@/repositories/apiClient';

import { Community } from "@/components/Cards/CommunityCard/Community.interface";

const stubGetCommunitiesResponse = [
  {
    id: "c1",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "15.4K",
    communityName: "Tech Innovators Hub",
    coordinates: {
      lat: 49.2827,
      lng: -123.1207
    }
  },
  {
    id: "c2",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "8.2K",
    communityName: "Urban Gardeners Connect",
    coordinates: {
      lat: 49.2482,
      lng: -123.1161
    }
  },
  {
    id: "c3",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "23.7K",
    communityName: "Fitness Warriors",
    coordinates: {
      lat: 49.2578,
      lng: -123.1639
    }
  },
  {
    id: "c4",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "5.9K",
    communityName: "Global Book Club",
    coordinates: {
      lat: 49.2846,
      lng: -123.1334
    }
  },
  {
    id: "c5",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "12.3K",
    communityName: "Digital Art Collective",
    coordinates: {
      lat: 49.2634,
      lng: -123.1389
    }
  },
  {
    id: "c6",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "19.8K",
    communityName: "Foodie Adventures",
    coordinates: {
      lat: 49.2785,
      lng: -123.0887
    }
  },
  {
    id: "c7",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "31.2K",
    communityName: "Pet Parents Society",
    coordinates: {
      lat: 49.2688,
      lng: -123.1565
    }
  },
  {
    id: "c8",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "27.5K",
    communityName: "Global Travelers Network",
    coordinates: {
      lat: 49.2571,
      lng: -123.1237
    }
  },
  {
    id: "c9",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "11.6K",
    communityName: "Music Makers United",
    coordinates: {
      lat: 49.2678,
      lng: -123.1289
    }
  },
  {
    id: "c10",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    memberAmount: "16.8K",
    communityName: "Eco Warriors Alliance",
    coordinates: {
      lat: 49.2813,
      lng: -123.1148
    }
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
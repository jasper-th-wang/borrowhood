const stubGetInterestsResponse = [
  "Books",
  "Cooking",
  "Food",
  "Movies",
  "Travel",
  "Outdoors",
  "Video games",
  "Board games",
  "Reading",
  "Sci-Fi",
  "Museums",
  "Photography",
  "Art",
  "Music",
  "Yoga",
  "Gardening",
  "Coffee",
  "Theater",
  "Dancing",
  "Podcasts",
  "Hiking",
  "Crafts",
  "Writing",
  "Biking",
  "Meditation",
  "History",
  "Tech",
  "Languages",
  "Astronomy",
  "Baking"
];
export async function getInterests(): Promise<string[]> {
  // return Promise.resolve(stubGetCommunitiesResponse)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stubGetInterestsResponse);
    }, 2000);
  })
}

export async function postInterests(interests: string[]): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Interests updated:', interests);
      resolve();
    }, 2000);
  })
}
export type Faq = {
  title: string;
  content: string;
};

export type Reward = {
  name: string;
  thumbnail_url: string;
};

export const loginUrl = "/zaloguj";
export const profileUrl = (name: string) => `/p/${name}`;
export const profileOrLogin = (name: string | null | undefined) => name ? profileUrl(name) : loginUrl;
const rewardUrl = (file: string) => `/images/rewards/${file}.png`;

export const FAQ: Faq[] = [
  {
    title: "Jak zgłosić pracę?",
    content:
      "Aby zgłosić swój projekt musisz przejść na stronę logowania/rejestrowania. Następnie zautoryzować się i utworzyć projekt."
  },
  {
    title: "Kto może wziąć udział w konkursie?",
    content:
      "Każdy uczeń Centrum Kształcenia Zawodowego i Ustawicznego w Łodzi."
  },
  {
    title: "Czy jest możliwość zgłoszenia projektu grupowo?",
    content:
      "Nie, CKZiU CodeFest 2024 jest konkursem indywidualnym lecz w przyszłości nie jest to wykluczone."
  },
  {
    title: "Czy konkurs jest darmowy?",
    content: "Tak, udział w konkursie jest darmowy."
  },
  {
    title: "Kto jest organizatorem konkursu?",
    content:
      "Organizatorem konkursu CKZiU CodeFest 2024 jest Centrum Kształcenia Zawodowego i Ustawicznego w Łodzi."
  }
];

export const REWARDS: Reward[] = [
  {
    name: "Słuchawki",
    thumbnail_url: rewardUrl("headphones")
  },
  {
    name: "Słuchawki",
    thumbnail_url: rewardUrl("headphones")
  },
  {
    name: "Kamerka",
    thumbnail_url: rewardUrl("camera")
  },
  {
    name: "PowerBank 20000mAh",
    thumbnail_url: rewardUrl("powerbank")
  },
  {
    name: "PowerBank 20000mAh",
    thumbnail_url: rewardUrl("powerbank")
  },
  {
    name: "Łączówka",
    thumbnail_url: rewardUrl("cable")
  },
  {
    name: "Łączówka",
    thumbnail_url: rewardUrl("cable")
  }
];

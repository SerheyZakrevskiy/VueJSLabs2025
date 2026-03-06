import image1 from "../assets/images/vue-news-1.jpg";
import image2 from "../assets/images/vue-news-2.jpg";
import image3 from "../assets/images/vue-news-3.jpg";

export interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Vue 3 receives new ecosystem improvements",
    category: "Technology",
    date: "2026-03-01",
    excerpt:
      "The Vue ecosystem continues to evolve with better tooling and developer experience.",
    content:
      "Vue 3 remains one of the most popular frontend frameworks for building modern user interfaces. Developers appreciate its component approach, flexibility, and strong ecosystem.",
    image: image1,
  },
  {
    id: 2,
    title: "Frontend trends that shape web development",
    category: "Web",
    date: "2026-03-02",
    excerpt:
      "Modern frontend development focuses on performance, accessibility, and user experience.",
    content:
      "Today many teams adopt component-driven development, routing, transitions, and design systems. Vue is often used in educational and commercial projects because of its simplicity.",
    image: image2,
  },
  {
    id: 3,
    title: "Why local state and routing still matter",
    category: "Development",
    date: "2026-03-03",
    excerpt:
      "Even simple applications benefit from clean routing and predictable component structure.",
    content:
      "When an application is split into pages and reusable components, the project becomes easier to maintain and extend. This is especially useful for laboratory works and training projects.",
    image: image3,
  },
];

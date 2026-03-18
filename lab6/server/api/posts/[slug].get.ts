const posts = [
  {
    id: 1,
    slug: "nuxt-4-intro",
    title: "Вступ до Nuxt 4",
    excerpt: "Короткий вступ до можливостей Nuxt 4.",
    content: "Повний текст статті про Nuxt 4.",
  },
  {
    id: 2,
    slug: "nuxt-ui-basics",
    title: "Основи Nuxt UI",
    excerpt: "Як використовувати компоненти Nuxt UI.",
    content: "Повний текст статті про Nuxt UI.",
  },
  {
    id: 3,
    slug: "file-routing",
    title: "Файлова маршрутизація",
    excerpt: "Як працюють сторінки та динамічні маршрути.",
    content: "Повний текст статті про file-based routing.",
  },
];

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found",
    });
  }

  return post;
});

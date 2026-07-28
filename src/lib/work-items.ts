export type WorkItem = {
  year: string;
  title: string;
  description: string;
  slug: string;
};

export const workItems: WorkItem[] = [
  {
    year: "2025–Present",
    title: "Cost Estimation",
    description:
      "Founding engineer. Solo-built. $500K+ signed enterprise contracts, 7.5k+ estimations in production.",
    slug: "cost-estimation",
  },
  {
    year: "2024",
    title: "Multi-provider AI",
    description:
      "10 providers, 50+ models. Powered a $200K+ Adidas deal plus MillerKnoll ARR.",
    slug: "multi-provider-ai",
  },
  {
    year: "2024",
    title: "WOPI for Adidas",
    description:
      "In-platform Microsoft Office editing. Enterprise rollout to Adidas teams.",
    slug: "wopi-adidas",
  },
  {
    year: "2023",
    title: "Real-time collaboration",
    description:
      "WebSockets + MongoDB Change Streams + YJS for simultaneous multi-user editing.",
    slug: "realtime-collab",
  },
];

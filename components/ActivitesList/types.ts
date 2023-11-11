export type activitesListProps = {
  title: string;
  data: {
    id: number | string;
    name: string;
    description: string;
    img?: string;
    video?: string;
  }[];
};

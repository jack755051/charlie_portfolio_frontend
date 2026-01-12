export interface IPortfolio {
    id: string;
    title: string;
    description: string;
    role: string;
    duration: string;
    technologies: ITechnologyItem[];
    features?: string[];
    achievements?: string[];
    link?: string;
}

export interface ITechnologyItem {
    name: string;
    icon: string;
    category?: string;
}
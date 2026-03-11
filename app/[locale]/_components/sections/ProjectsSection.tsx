import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Code2 } from 'lucide-react';
import Image from 'next/image';

type ProjectStaticData = {
    image: string;
    imageHref: string;
    tags: string[];
    demoUrl: string;
    codeUrl: string;
};

type Project = ProjectStaticData & {
    id: number;
    title: string;
    description: string;
};

const PROJECT_STATIC_DATA: ProjectStaticData[] = [
    {
        image: '/images/weather-dashboard-snapshot.jpg',
        imageHref: 'https://weather-dashboard-eustacecheng.vercel.app/',
        tags: ['React', 'Next.js', 'TypeScript', 'Recharts', 'Upstash Redis', 'GenAI', 'NextAuth', 'Prisma', 'Postgres', 'Vercel'],
        demoUrl: 'https://weather-dashboard-eustacecheng.vercel.app/',
        codeUrl: 'https://github.com/parkerCYH/weather-dashboard',
    },
    {
        image: 'https://placehold.co/600x400/dbeafe/3b82f6/png?text=Project+2',
        imageHref: '#',
        tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
        demoUrl: '#',
        codeUrl: '#',
    },
    {
        image: 'https://placehold.co/600x400/fce7f3/ec4899/png?text=Project+3',
        imageHref: '#',
        tags: ['Vue.js', 'Python', 'MongoDB'],
        demoUrl: '#',
        codeUrl: '#',
    },
];

export default function ProjectsSection() {
    const t = useTranslations('projects');

    const projects: Project[] = PROJECT_STATIC_DATA.map((data, i) => ({
        id: i + 1,
        title: t(`items.${i}.title`),
        description: t(`items.${i}.description`),
        ...data,
    }));

    return (
        <section id="projects" className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-gray-600">{t('description')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                            <a
                                href={project.imageHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative h-48 bg-gray-200"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </a>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-100 rounded text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="flex-1" asChild>
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-4 h-4 mr-1" />
                                            {t('demoLabel')}
                                        </a>
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1" asChild>
                                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                                            <Code2 className="w-4 h-4 mr-1" />
                                            {t('codeLabel')}
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

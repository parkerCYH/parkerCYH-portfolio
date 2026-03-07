import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Code2 } from 'lucide-react';
import Image from 'next/image';

const PROJECT_IMAGES = [
    'https://placehold.co/600x400/e2e8f0/64748b/png?text=Project+1',
    'https://placehold.co/600x400/dbeafe/3b82f6/png?text=Project+2',
    'https://placehold.co/600x400/fce7f3/ec4899/png?text=Project+3',
];

const PROJECT_TAGS = [
    ['React', 'TypeScript', 'Node.js'],
    ['Next.js', 'PostgreSQL', 'Tailwind'],
    ['Vue.js', 'Python', 'MongoDB'],
];

export default function ProjectsSection() {
    const t = useTranslations('projects');

    const projects = [0, 1, 2].map((i) => ({
        id: i + 1,
        title: t(`items.${i}.title`),
        description: t(`items.${i}.description`),
        image: PROJECT_IMAGES[i],
        tags: PROJECT_TAGS[i],
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
                            <div className="relative h-48 bg-gray-200">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
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
                                    <Button size="sm" variant="outline" className="flex-1">
                                        <Github className="w-4 h-4 mr-1" />
                                        {t('demoLabel')}
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                        <Code2 className="w-4 h-4 mr-1" />
                                        {t('codeLabel')}
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

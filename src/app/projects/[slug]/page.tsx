import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAdjacentProjects,
} from "@/lib/projects";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — Jahid",
    };
  }

  return {
    title: `${project.title} — Jahid`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Jahid`,
      description: project.shortDescription,
      images: [
        {
          url: project.image,
          alt: `${project.title} project preview`,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const adjacent = getAdjacentProjects(slug);

  return <ProjectDetailLayout project={project} adjacent={adjacent} />;
}

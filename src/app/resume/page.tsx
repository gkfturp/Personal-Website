import { getClient } from "@/sanity/client";
import { resumeQuery } from "@/sanity/queries";
import ResumeClientPage from "@/components/ResumeClientPage";
import { Experience } from "@/components/ResumeExperience";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ResumePage() {
  const client = getClient();
  const experiences: Experience[] = await client.fetch(resumeQuery);

  return <ResumeClientPage experiences={experiences} />;
}

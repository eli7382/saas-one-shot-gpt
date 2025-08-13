import Calendar from "@/components/Calendar";
export default function ProjectCalendar({ params }: { params: { projectId: string } }) {
  return <div className="space-y-4"><h1 className="text-xl font-semibold">Calendar</h1><Calendar projectId={params.projectId} /></div>;
} 
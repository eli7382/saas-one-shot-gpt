import Board from "@/components/Board";
export default function ProjectBoard({ params }: { params: { projectId: string } }) {
  return <div className="space-y-4"><h1 className="text-xl font-semibold">Board</h1><Board projectId={params.projectId} /></div>;
} 
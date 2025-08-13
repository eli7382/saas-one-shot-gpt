export const metadata = {
  title: "TeamBoard Pro – Real-time project management",
  description: "Collaborative Kanban, calendars, comments, analytics, and more. Built for speed & accessibility."
};
export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Move work forward, together.</h1>
        <p className="mt-4 text-lg text-muted-foreground">Boards, tasks, comments with @mentions, and a powerful calendar—now with real-time updates.</p>
        <div className="mt-6 flex gap-3">
          <a href="/api/auth/signin" className="rounded-xl px-5 py-3 bg-black text-white">Get started</a>
          <a href="/pricing" className="rounded-xl px-5 py-3 border">See pricing</a>
        </div>
      </div>
      <img src="/icons/icon-512.png" className="w-full max-w-md mx-auto" alt="App preview" />
    </section>
  );
} 
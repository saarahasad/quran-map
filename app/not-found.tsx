import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-semibold text-slate-800">Page not found</h1>
      <p className="mt-2 text-slate-600">This surah or page could not be found.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700"
      >
        Back to home
      </Link>
    </main>
  );
}

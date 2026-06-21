import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="text-6xl">{"\u{1F50D}"}</div>
      <h1 className="mt-6 font-display text-4xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 max-w-md text-gray-600">
        The demo you&rsquo;re looking for doesn&rsquo;t exist. Head back to the portfolio to explore
        all the live demos.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to portfolio
      </Link>
    </main>
  );
}

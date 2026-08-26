import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
          <p>Page not found</p>
          <Link href="/" style={{ color: '#3b82f6' }}>Go home</Link>
        </div>
      </body>
    </html>
  );
}

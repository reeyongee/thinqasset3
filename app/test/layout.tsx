export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .site-bg { display: none !important; }
            html, body { background: var(--ta-navy-deep) !important; }
          `,
        }}
      />
      {children}
    </>
  );
}

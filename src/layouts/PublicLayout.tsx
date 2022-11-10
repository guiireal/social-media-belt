type LayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: LayoutProps) {
  return (
    <>
      <h1>Public Layout</h1>
      {children}
    </>
  );
}

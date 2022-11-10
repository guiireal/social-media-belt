type LayoutProps = {
  children: React.ReactNode;
};

export default function TenantLayout({ children }: LayoutProps) {
  return (
    <>
      <h1>Tenant Layout</h1>
      {children}
    </>
  );
}

type LayoutProps = {
  children: React.ReactNode;
};

export default function EmptyLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

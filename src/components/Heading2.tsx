type ComponentProps = {
  children: React.ReactNode;
};

export default function Heading2({ children }: ComponentProps) {
  return <h2 className="text-gray-400 text-md">{children}</h2>;
}

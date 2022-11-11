type ComponentProps = {
  children: React.ReactNode;
};

export default function Heading1({ children }: ComponentProps) {
  return <h1 className="text-4xl font-semibold text-gray-800">{children}</h1>;
}

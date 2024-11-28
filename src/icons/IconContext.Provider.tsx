import { IconContext } from 'react-icons';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IconContext.Provider value={{ className: 'icon-base' }}>
      {children}
    </IconContext.Provider>
  );
}

export const metadata = {
  title: 'Add and Edit Destinations',
  description: 'Destinations add and edit page',
};

const CenterLayout = ({ children }) => {
  return (
    <div className={`h-screen w-full flex  justify-center items-center`}>
      {children}
    </div>
  );
};

export default CenterLayout;

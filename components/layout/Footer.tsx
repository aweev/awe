export function Footer() {
  return (
    <footer className="bg-deep-charcoal text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AWE Empowerment Foundation. All Rights Reserved.</p>
          <p className="mt-2">Building Futures with Dignity and Hope.</p>
        </div>
      </div>
    </footer>
  );
}
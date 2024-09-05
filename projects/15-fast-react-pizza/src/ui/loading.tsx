function Loading({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-200/20 backdrop-blur-sm">
      <div className="loader" />
    </div>
  );
}

export default Loading;

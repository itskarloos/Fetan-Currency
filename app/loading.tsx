export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen dark:bg-black bg-white">
      <div className="w-16 h-16 relative">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-full h-full rounded-full border-2 dark:border-neutral-800 border-neutral-200absolute"
            style={{
              borderLeftColor: "white",
              animation: `spin 1.5s cubic-bezier(0.55, 0.25, 0.25, 0.70) infinite`,
              animationDelay: `${-0.3 * index}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

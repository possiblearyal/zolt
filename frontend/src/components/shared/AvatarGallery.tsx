const AvatarGallery = ({
  setPreBuildAvatar,
}: {
  setPreBuildAvatar: (avatar: string) => void;
}) => {
  const images = Array.from(
    { length: 55 },
    (_, i) => `/signatures/${i + 1}.png`
  );

  return (
    <div className="h-[200px] w-full p-2 overflow-y-auto">
      <div className="grid grid-cols-3 gap-x-3 gap-y-6 justify-items-center">
        {images.map((src, index) => (
          <button
            key={`Image-${index}`}
            className="relative flex h-20 w-20 rounded-full p-2 hover:border hover:border-primary hover:bg-primary/40 dark:hover:bg-primary/40 cursor-pointer"
            type="button"
            onClick={() => setPreBuildAvatar(src)}
          >
            <img
              src={src}
              alt={`Signature snap - ${index + 1}`}
              width={80}
              height={80}
              className="aspect-square h-full w-full rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarGallery;

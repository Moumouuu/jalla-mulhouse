interface HeaderTitleProps {
  title: string;
  subtitle: string;
  underline?: boolean;
  big?: boolean;
}

export default function HeaderTitle({
  title,
  subtitle,
  underline,
  big,
}: HeaderTitleProps) {
  return (
    <div>
      <div
        className={
          underline
            ? "border-b border-gray-500 w-full pt-5 pb-8"
            : "w-full pt-5 pb-3"
        }
      >
        <h1
          className={
            big ? "text-2xl md:text-3xl mb-1" : "text-xl md:text-2xl mb-1"
          }
        >
          {title}
        </h1>
        <p
          className={
            big
              ? "text-md md:text-lg text-gray-500"
              : "text-sm md:text-md text-gray-500"
          }
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

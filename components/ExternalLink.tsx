import ArrowUpAndRight from "./icons-v2/ArrowUpAndRight";

interface Props {
  name: string,
  url: string,
}

export default function ExternalLink({ name, url }: Props) {
  return (
    <div>
      {/* Icon */}
      <ArrowUpAndRight
        width={20}
        height={20}
      />
      {/* Text */}
      <a href={url}>
        <p>
          <u>
            {name}
          </u>
        </p>
      </a>
    </div>
  );
}
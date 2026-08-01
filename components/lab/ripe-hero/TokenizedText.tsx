type TokenizedTextProps = {
  text: string;
  charClassName?: string;
};

function WordGroup({
  word,
  charClassName,
}: {
  word: string;
  charClassName?: string;
}) {
  return (
    <span className="ripe-hero__word">
      {[...word].map((char, index) => (
        <span key={`${char}-${index}`} className={charClassName}>
          {char}
        </span>
      ))}
    </span>
  );
}

export function TokenizedText({
  text,
  charClassName = "ripe-hero__char",
}: TokenizedTextProps) {
  const words = text.replace(/\u2028/g, " ").trim().split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`}>
          <WordGroup word={word} charClassName={charClassName} />
          {wordIndex < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

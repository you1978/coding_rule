import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { GuideSample } from "@/content/guides";

const readSnippet = (sample: GuideSample) => {
  const absolutePath = join(process.cwd(), sample.path);
  const fileContent = readFileSync(absolutePath, "utf8");
  const lines = fileContent.split(/\r?\n/);

  const startIndex = sample.startLine ? Math.max(sample.startLine - 1, 0) : 0;
  const endIndex = sample.endLine ? Math.min(sample.endLine, lines.length) : lines.length;

  const snippet = lines.slice(startIndex, endIndex).join("\n");

  return {
    snippet: snippet.replace(/\s+$/u, ""),
    startLine: startIndex + 1,
    endLine: endIndex,
  };
};

type CodeSampleProps = {
  sample: GuideSample;
};

export const CodeSample = ({ sample }: CodeSampleProps) => {
  const { snippet, startLine, endLine } = readSnippet(sample);

  const languageLabel = sample.language ?? sample.path.split(".").pop() ?? "text";
  const lineLabel = startLine === endLine ? `L${startLine}` : `L${startLine}–${endLine}`;

  return (
    <figure className="c-code-sample">
      <figcaption className="c-code-sample__caption">
        <span className="c-code-sample__file">{sample.label}</span>
        <span className="c-code-sample__meta">
          {languageLabel} · {lineLabel}
        </span>
      </figcaption>
      <pre className="c-code-sample__pre">
        <code>{snippet}</code>
      </pre>
    </figure>
  );
};

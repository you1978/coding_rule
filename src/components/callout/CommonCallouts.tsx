import Callout from "@/components/callout/Callout";

export default function CommonCallouts() {
    return (
    <div className="grid gap-4">
      <Callout title="注意" tone="warning">
        このページの内容は学習用です。実際のプロジェクトでは適切な規約に従ってください。
      </Callout>

      <Callout title="ヒント" tone="info">
        コーディング規約を守ると、チーム開発がスムーズになります。
      </Callout>
    </div>
  );
}
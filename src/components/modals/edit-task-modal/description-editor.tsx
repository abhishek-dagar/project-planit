import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
}

function DescriptionEditor({ data, onChange, holder }: any) {
  const editor: BlockNoteEditor = useBlockNote({
    editable: true,
    initialContent: data ? (JSON.parse(data) as PartialBlock[]) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });
  return (
    editor && (
      <div className="[&_.ProseMirror]:bg-secondary-background [&_.tippy-box]:bg-secondary-background [&_.tiptap]:py-4 [&_div[class*=tiptap]]:bg-secondary-background [&_.mantine-Menu-dropdown]:bg-secondary-background  [&_.mantine-Menu-item]:bg-secondary-background [&_.mantine-Menu-item:hover]:bg-background [&_.mantine-Menu-itemLabel]:bg-transparent [&_div[class*=blockOuter]]:my-3">
        <BlockNoteView
          editor={editor}
          theme={"dark"}
          placeholder="Write your description here!"
        />
      </div>
    )
  );
}

export default DescriptionEditor;

// import React, { useEffect, useRef } from "react";
// import EditorJS, { OutputData } from "@editorjs/editorjs";
// import { EDITOR_TOOLS } from "./EditorTools";
// import DragDrop from "editorjs-drag-drop";
// import "./editor.css";
// import Editor from "@stfy/react-editor.js";
// const DescriptionEditor = ({ data, onChange, holder }: any) => {
//   // const component = useRef<any>(null);
//   const ref = useRef<any>();

//   //   //initialize editorjs
//   useEffect(() => {
//     //initialize editor if we don't have a reference
//     if (!ref.current) {
//       const editor: any = new EditorJS({
//         holder: "editor-container",
//         inlineToolbar: ["link", "bold", "italic"],
//         tools: EDITOR_TOOLS,
//         data,
//         async onChange(api, event) {
//           const data = await api.saver.save();
//           onChange(data);
//         },
//         placeholder: "Write your Description here",
//         onReady: () => {
//           new DragDrop(editor);
//         },
//       });
//       ref.current = editor;
//     }

//     //     //add a return function handle cleanup
//     return () => {
//       if (ref.current && ref.current.destroy) {
//         ref.current.destroy();
//       }
//     };
//   }, []);

//   // return (
//   //   <div
//   //     id={holder}
//   //     className="prose rounded-lg max-w-full h-[400px] overflow-auto bg-secondary-background p-4 text-foreground [&_.ce-toolbar\_\_plus:hover]:bg-background [&_svg]:text-foreground [&_.ce-toolbar\_\_settings-btn:hover]:bg-background [&_div[class*=selected]]:bg-transparent [&_div[class*=selected]_div[class*=ce]]:bg-background [&_.ce-popover]:bg-background [&_.ce-popover]:text-foreground [&_.ce-popover]:border-none [&_.ce-popover-item:hover]:bg-secondary-background [&_.ce-popover-item\_\_title]:bg-transparent [&_.ce-popover-item]:text-foreground [&_.ce-popover-item--confirmation]:bg-[#e24a4a] [&_.ce-popover-item\_\_icon]:bg-background [&_.ce-popover-item\_\_icon]:border-background"
//   //   />
//   // );
//   return (
//     <>
//       <div
//         id="editor-container"
//         className="prose rounded-lg max-w-full h-[400px] overflow-auto bg-secondary-background p-4 text-foreground [&_.ce-toolbar\_\_plus:hover]:bg-background [&_svg]:text-foreground [&_.ce-toolbar\_\_settings-btn:hover]:bg-background [&_div[class*=selected]]:bg-transparent [&_div[class*=selected]_div[class*=ce]]:bg-background [&_.ce-popover]:bg-background [&_.ce-popover]:text-foreground [&_.ce-popover]:border-none [&_.ce-popover-item:hover]:bg-secondary-background [&_.ce-popover-item\_\_title]:bg-transparent [&_.ce-popover-item]:text-foreground [&_.ce-popover-item--confirmation]:bg-[#e24a4a] [&_.ce-popover-item--confirmation:hover]:bg-[#e24a4a] [&_.ce-popover-item\_\_icon]:bg-background [&_.ce-popover-item\_\_icon]:border-background [&_.ce-inline-toolbar]:bg-secondary-background [&_.ce-inline-toolbar]:border-border [&_.ce-inline-tool:hover]:bg-background [&_.ce-inline-toolbar\_\_dropdown:hover]:bg-background [&_.ce-conversion-toolbar]:bg-background [&_.ce-conversion-toolbar]:border-border [&_.ce-conversion-tool:hover]:bg-secondary-background [&_.ce-conversion-tool\_\_icon]:border-background [&_.ce-conversion-tool\_\_icon]:bg-background [&_.cdx-search-field]:bg-background [&_div[class*=ce]::selection]:bg-primary"
//       />
//       {/* <Editor
//         ref={component}
//         tools={EDITOR_TOOLS}
//         holder="editor-container"
//         // excludeDefaultTools={["header"]}
//         // onChange={() => console.log("Something is changing!!")}
//         onData={(data) => onChange(data)}
//         // customTools={{
//         //   header: CustomHeader,
//         // }}
//         // onReady={() => {
//         //   if (component && component.current && component.current.editor) {
//         //     new DragDrop(component?.current?.editor);
//         //   }
//         // }}
//         data={data} */}
//       {/* /> */}
//     </>
//   );
// };

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
}

function DescriptionEditor({ data, onChange, holder }: any) {
  console.log(1);

  const editor: BlockNoteEditor = useBlockNote({
    editable: true,
    initialContent: data ? (JSON.parse(data) as PartialBlock[]) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });
  return (
    <div className="[&_.ProseMirror]:bg-secondary-background [&_.tippy-box]:bg-secondary-background [&_.tiptap]:py-4 [&_div[class*=tiptap]]:bg-secondary-background [&_.mantine-Menu-dropdown]:bg-secondary-background  [&_.mantine-Menu-item]:bg-secondary-background [&_.mantine-Menu-item:hover]:bg-background [&_.mantine-Menu-itemLabel]:bg-transparent [&_div[class*=blockOuter]]:my-3">
      <BlockNoteView
        editor={editor}
        theme={"dark"}
        placeholder="Write your description here!"
      />
    </div>
  );
}

export default DescriptionEditor;

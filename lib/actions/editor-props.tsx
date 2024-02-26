import { EditorProviderProps } from "@tiptap/react";
import { startImageUpload } from "./image-upload";

export const defaultEditorProps: EditorProviderProps["editorProps"] = {
  handleDOMEvents: {
    keydown: (_view, event) => {
      // prevent default event listeners from firing when slash command is active
      if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
        const slashCommand = document.querySelector("#slash-command");
        if (slashCommand) {
          return true;
        }
      }
    },
  },
  handlePaste: (view, event) => {
    if (
      event.clipboardData &&
      event.clipboardData.items &&
      event.clipboardData.items.length > 0
    ) {
      for (let i = 0; i < event.clipboardData.items.length; i++) {
        const item = event.clipboardData.items[i];

        // Example handling for image type
        if (item.type.indexOf("image") !== -1) {
          event.preventDefault();
          const file = item.getAsFile();
          if (!file) {
            console.error("Failed to retrieve file from clipboard item.");
            continue; // Skip to the next item
          }
          const pos = view.state.selection.from;

          startImageUpload(
            file,
            (src) => {
              const node = view.state.schema.nodes.image.create({ src });
              view.dispatch(view.state.tr.replaceRangeWith(pos, pos, node));
            },
            (error) => {
              console.error("Error uploading image:", error);
            }
          );
          return true;
        }
      }
    }
    return false;
  },
  handleDrop: (view, event, _slice, moved) => {
    if (
      !moved &&
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files.length > 0
    ) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (!file) {
        console.error("Failed to retrieve file from dropped item.");
        return false;
      }
      const coordinates = view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      });
      // here we deduct 1 from the pos or else the image will create an extra node
      startImageUpload(
        file,
        (src) => {
          const node = view.state.schema.nodes.image.create({ src });
          view.dispatch(
            view.state.tr.replaceRangeWith(
              coordinates?.pos || 0 - 1,
              coordinates?.pos || 0 - 1,
              node
            )
          );
        },
        (error) => {
          console.error("Error uploading image:", error);
        }
      );
      return true;
    }
    return false;
  },
};

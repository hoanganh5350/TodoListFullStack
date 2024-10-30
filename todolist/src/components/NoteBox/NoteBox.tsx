import React, { ReactElement, useEffect, useMemo, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteSchema,
  defaultInlineContentSpecs,
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core";
import {
  DefaultReactGridSuggestionItem,
  GridSuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import style from "./NoteBox.module.scss";
import { Mention } from "./Mentions";
import {
  CaretDownFill,
  CaretUpFill,
  PencilSquare,
} from "react-bootstrap-icons";

export type IUserDetails = {
  id: number;
  userName: string;
};

// Convert list user to arr name string
const convertListName = (arrUser: IUserDetails[]): string[] =>
  arrUser.map((user: IUserDetails) => user.userName);

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});

// Function which gets all users for the mentions menu.
const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor,
  users: string[]
): DefaultReactGridSuggestionItem[] => {
  return users.map((user) => ({
    id: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "mention",
          props: {
            user,
          },
        },
        " ", // add a space after the mention
      ]);
    },
    icon: <div className={style.displayNameMention}>{user}</div>,
  }));
};

type NoteBoxProps = {
  className?: string;
  iconSubTask?: string | ReactElement;
  open?: boolean;
  height?: number;
  title: string | ReactElement;
  content?: string;
  onChange: (e: string, userMention?: IUserDetails[]) => void;
  listUserMention?: IUserDetails[];
  userMentionDefault?: IUserDetails[];
  onUpdateSubtask?: VoidFunction;
};

export const NoteBox = ({
  className,
  iconSubTask,
  open = false,
  height = 300,
  title,
  content,
  onChange,
  listUserMention,
  userMentionDefault,
  onUpdateSubtask,
}: NoteBoxProps): JSX.Element => {
  const checkMention = !!listUserMention && listUserMention.length !== 0;
  const initialContent = useMemo((): PartialBlock[] => {
    const initialConvert = content ? JSON.parse(content) : [{}];
    return initialConvert as PartialBlock[];
  }, [content]);
  const listUserName = useMemo(
    () => convertListName(listUserMention ?? []),
    [listUserMention]
  );
  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent,
  });
  const [openNode, setOpenNote] = useState<boolean>(open);
  const [userMentions, setUserMentions] = useState<IUserDetails[]>(
    listUserMention && userMentionDefault ? userMentionDefault : []
  );
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // Renders the editor instance using a React component.
  return (
    <div
      className={`${style.containerNoteBox} ${className}`}
      style={{ height: openNode ? `${height}px` : "50px" }}
    >
      <div className={style.containerTitleNote}>
        {/* icon and title */}
        <div className={style.iconAndTitle}>
          <div className={style.iconSubTask}>{iconSubTask ?? "NA"}</div>
          <div className={style.titleNote}>{title}</div>
        </div>
        <div className={style.iconAction}>
          {/* icon update subTask */}
          {isUpdate && (
            <div className={style.iconUpdate} onClick={onUpdateSubtask}>
              <PencilSquare />
            </div>
          )}

          {/* icon open subTask */}
          <div
            className={style.iconOpen}
            onClick={() => setOpenNote(!openNode)}
          >
            {openNode ? <CaretDownFill /> : <CaretUpFill />}
          </div>
        </div>
      </div>
      {openNode && (
        <BlockNoteView
          className={style.noteBoxCustom}
          aria-disabled={true}
          editor={editor}
          onChange={() => {
            const valueChange = editor.document.map((item: any) => {
              const { id, ...newItem } = item;
              return newItem;
            });

            if (
              JSON.stringify(valueChange) !== JSON.stringify(initialContent)
            ) {
              setIsUpdate(true);
            } else {
              setIsUpdate(false);
            }
            if (!checkMention) {
              onChange(JSON.stringify(valueChange), []);
              return;
            }

            let arrayNameMention: string[] = [];

            valueChange.forEach((currentValue) => {
              if (!currentValue.content) return;
              ((currentValue?.content as any[]) ?? []).forEach((item: any) => {
                if (
                  item.type === "mention" &&
                  !arrayNameMention.includes(item.props.user)
                ) {
                  arrayNameMention.push(item.props.user);
                }
              });
            }, []);

            const userMentionNames = userMentions.map(
              (item: IUserDetails) => item.userName
            );

            if (
              JSON.stringify(arrayNameMention) ===
              JSON.stringify(userMentionNames)
            ) {
              onChange(JSON.stringify(valueChange), userMentions);
              return;
            }

            const tmp: Record<string, IUserDetails> = {};
            (listUserMention ?? []).forEach(
              (item: IUserDetails) => (tmp[item.userName] = item)
            );
            const newDataUserMention = arrayNameMention.map(
              (el: string) => tmp[el]
            );

            onChange(JSON.stringify(valueChange), newDataUserMention);
            setUserMentions(newDataUserMention);
          }}
        >
          <GridSuggestionMenuController
            triggerCharacter={"@"}
            getItems={async (query) =>
              // Gets the mentions menu items
              // TODO: Fix map/type cast
              filterSuggestionItems(
                getMentionMenuItems(editor, listUserName).map((item) => ({
                  ...item,
                  title: item.id,
                })),
                query
              ) as DefaultReactGridSuggestionItem[]
            }
            columns={1}
            minQueryLength={0}
          />
        </BlockNoteView>
      )}
    </div>
  );
};

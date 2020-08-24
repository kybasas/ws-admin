import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { ListItemId } from "primitives/List";
import Tabs from "primitives/Tabs";
import Spinner from "primitives/Spinner";
import Toggle from "primitives/Toggle";

import Sorting, { SortingElementInterface } from "components/Sorting";

import {
  ai,
  Aligns,
  borderRight,
  child,
  flex,
  flexColumn,
  flexWrap,
  marginBottom,
  marginRight,
  marginTop,
  padding,
  paddingRight,
} from "libs/styles";

import Buttons from "./Buttons";
import Dropdowns from "./Dropdowns";
import Modals from "./Modals";
import RadioGroups from "./RadioGroups";
import Inputs from "./Inputs";

function TestPage() {
  const [sorting, setSorting] = React.useState<SortingElementInterface>({
    id: "new",
  });

  const [droppedItem, setDroppedItem] = React.useState<ListItemId>();
  const [switched, setSwitched] = React.useState(false);

  return (
    <Wrapper
      styles={[
        padding("16px 24px"),
        flex,
        child([
          marginRight(6),
          marginBottom(6),
          borderRight(1, "gray-blue/09"),
          paddingRight(6),
          ai(Aligns.START),
          flex,
          flexColumn,
          child(marginBottom(6)),
        ]),
        flexWrap,
      ]}
    >
      <Wrapper>
        <Spinner />
        <Button loading onClick={console.log}>
          Авторизация
        </Button>
        <Button loading disabled iconLeft="delete" onClick={console.log}>
          Автор
        </Button>
        <Button loading disabled type={ButtonType.SECONDARY} iconLeft="delete" onClick={console.log}>
          Автор
        </Button>
        <Button loading disabled type={ButtonType.GHOST} iconLeft="delete" onClick={console.log}>
          Автор
        </Button>
      </Wrapper>
      <Buttons />

      <Wrapper>
        <Inputs />
      </Wrapper>

      <Wrapper>
        <Sorting
          items={[
            { title: "по новизне", id: "new", hasDirection: false },
            { title: "по дате создания", id: "date", hasDirection: true },
          ]}
          selected={sorting}
          onChange={(id, direction) => {
            setSorting({ id, direction });
          }}
        />
      </Wrapper>
      <Wrapper>
        <DroppedList
          mode={DroppedListOpenMode.CLICK}
          margin={4}
          items={[
            { title: "по новизне", code: "new" },
            { title: "по дате создания", code: "date" },
          ]}
          onChange={(code) => setDroppedItem(code)}
        >
          {(state, parentRef, subChild) => (
            <Button
              ref={parentRef}
              className="card-actions"
              type={ButtonType.ICON}
              size={ButtonSize.SMALL}
              iconLeft="kebab-horizontal"
              onClick={state.toggle}
            >
              {subChild}
            </Button>
          )}
        </DroppedList>
        <DroppedList
          mode={DroppedListOpenMode.CLICK}
          margin={4}
          items={[
            { title: "по новизне", code: "new" },
            { title: "по дате создания", code: "date" },
          ]}
          onChange={(code) => setDroppedItem(code)}
        >
          {(state, parentRef, subChild) => (
            <Button
              styles={marginTop(50)}
              ref={parentRef}
              className="card-actions"
              type={ButtonType.ICON}
              size={ButtonSize.SMALL}
              iconLeft="kebab-horizontal"
              onClick={state.toggle}
            >
              {subChild}
            </Button>
          )}
        </DroppedList>
      </Wrapper>
      <Dropdowns />
      <Wrapper>
        <Tabs
          items={[
            { render: () => <div>1</div>, title: "Атрибуты" },
            { render: () => <div />, title: "Текст" },
            { render: () => <div />, title: "Статьи по теме" },
          ]}
        />
      </Wrapper>
      <Wrapper>
        <Modals />
      </Wrapper>
      <Wrapper>
        <RadioGroups />
      </Wrapper>
      <Wrapper>
        <Toggle enabled={switched} onChange={setSwitched} />
        <Toggle text="asd" enabled={switched} onChange={setSwitched} />
        <Toggle textOnRight text="asd" enabled={switched} onChange={setSwitched} />
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(observer(TestPage));

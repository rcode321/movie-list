import React from "react";

const Listgroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;

  return (
    <div className="list-group">
      {items.map((item) => (
        <a
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          href="#/"
          className={
            item === selectedItem
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action "
          }
          aria-current="true"
        >
          {item[textProperty]}
        </a>
      ))}
    </div>
  );
};

Listgroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Listgroup;

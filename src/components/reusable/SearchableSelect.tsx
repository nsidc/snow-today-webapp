import React from 'react';


export interface ISelectOptionProps {
  text: string;
  value: string;
}
interface ISearchableSelectProps {
  id: string;
  selectOptionProps: ISelectOptionProps[];
  value: string | undefined;
  onChange: (any) => void;
  placeholderText: string;
}


const SearchableSelect: React.FC<ISearchableSelectProps> = (props) => {
  // select placeholder option when value is undefined:
  const value = props.value || "";

  return (
    <select
      id={props.id}
      data-live-search={"true"}
      value={value}
      onChange={props.onChange}>
      <option value="" disabled hidden>{props.placeholderText}</option>
      {props.selectOptionProps.map((optionProps) => (
        <option key={optionProps.value} value={optionProps.value}>{optionProps.text}</option>
      ))}
    </select>
  );
}

export default SearchableSelect;

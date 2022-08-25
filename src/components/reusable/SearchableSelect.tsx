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
}


const SearchableSelect: React.FC<ISearchableSelectProps> = (props) => {
  return (
    <select
      id={props.id}
      data-live-search={"true"}
      value={props.value}
      onChange={props.onChange}>
      {props.selectOptionProps.map((optionProps) => (
        <option key={optionProps.value} value={optionProps.value}>{optionProps.text}</option>
      ))}
    </select>
  );
}

export default SearchableSelect;

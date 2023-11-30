import { SearchBoxProps, SearchBox as _SearchBox } from "react-instantsearch";

export function SearchBox(props: SearchBoxProps) {
  return (
    <_SearchBox
      {...props}
      className="mb-4"
      classNames={{
        form: "bg-white rounded-full px-5 flex gap-3 text-xenon-500 shadow-lg dark:bg-slate-900 dark:text-gray-200",
        submit: "order-1",
        loadingIndicator: "order-1",
        input: "order-2 flex-1 py-3 focus:outline-none bg-transparent",
        reset: "order-3",
        submitIcon: "w-4 h-4 fill-current",
        resetIcon: "fill-current",
        loadingIcon: "fill-current",
      }}
    />
  );
}

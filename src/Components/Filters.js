import React from "react";
import { CategoriesData } from "./../Data/CategoriesData";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa";

const YearData = [
  {
    title: "Sort By Year",
  },
  {
    title: "1700 - 1800",
  },
  {
    title: "1800 - 1900",
  },
  {
    title: "1900 - 2000",
  },
  {
    title: "2000 - 2010",
  },
  {
    title: "2010 - 2020",
  },
  {
    title: "2020 - 2030",
  },
];

const TimesData = [
  {
    title: "Sort By Hours",
  },
  {
    title: "1 - 2 hours",
  },
  {
    title: "2 - 3 hours",
  },
  {
    title: "3 - 4 hours",
  },
  {
    title: "4 - 5 hours",
  },
  {
    title: "5 - 6 hours",
  },
];

const RatesData = [
  {
    title: "Sort By Rates",
  },
  {
    title: "1 star",
  },
  {
    title: "2 star",
  },
  {
    title: "3 star",
  },
  {
    title: "4 star",
  },
  {
    title: "5 star",
  },
];

const Filters = () => {
  const [category, setCategory] = React.useState({ title: "Category" });
  const [year, setYear] = React.useState(YearData[0]);
  const [time, setTime] = React.useState(TimesData[0]);
  const [rate, setRate] = React.useState(RatesData[0]);

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items: CategoriesData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: time,
      onChange: setTime,
      items: TimesData,
    },
    {
      value: rate,
      onChange: setRate,
      items: RatesData,
    },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaAngleDown className="w-4 h-4" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {item.items.map((itemf, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={itemf}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncated ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {itemf.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="w-3 h-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
};

export default Filters;

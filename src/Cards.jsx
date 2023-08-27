import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import ViewModal from "./viewModal";
import OverlayEdit from "./OverlayEdit";
import supabase from "./supabaseClient";
import swal from "sweetalert";

const actions = [
  {
    title: "Request time off",
    href: "#",
    icon: ClockIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Benefits",
    href: "#",
    icon: PencilSquareIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule a one-on-one",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Payroll",
    href: "#",
    icon: BanknotesIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Submit an expense",
    href: "#",
    icon: ReceiptRefundIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    title: "Training",
    href: "#",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Cards(props) {



  
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const [noteData, setNoteData] = useState([]);

 function subscribeEvents() {
    
const notes = supabase.channel('custom-all-channel')
.on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'notes' },
  (payload) => {
    console.log('Change received!', payload)
  }
)
.subscribe()
  }
  async function fetchData() {
    try {
      let { data: notes, error } = await supabase.from("notes").select("*");
      return notes;
    } catch (error) {
      swal({
        title: "Error!",
        text: "There was some error in fetching the notes. Please try again!",
        icon: "error",
        button: "OK",
      });
    }
  }
  async function fetchNoteData() {
    const fetchedData = await fetchData();
    setNoteData(fetchedData);
    console.log("🚀 ~ fetchNoteData ~ fetchedData:", fetchedData);
  }


  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(noteData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(noteData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, noteData]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % noteData.length;
    setItemOffset(newOffset);
    console.log(newOffset);
  };



  useEffect(() => {
  
   fetchNoteData();
    subscribeEvents();
  }, []);
  return ((noteData.length===0))?(<div> Loading </div>):(
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg  shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 sm:gap-x-2 sm:gap-y-2 sm:p-6  flex flex-col gap-y-2 p-4">
        {currentItems.map((action, actionIdx) => (
          <div
            key={action.note_id}
            className={classNames(
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-md"
            )}
          >
            <div className="flex flex-row">
              <div
                className={classNames(
                
                  "rounded-lg inline-flex p-3 ring-4 ring-white"
                )}
              >
                <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <div className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className=" inset-0" aria-hidden="true" />
                  {action.data.noteTitle}
                </div>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
               {(action.data.noteContent.length>200)?(action.data.noteContent.slice(0, 200)+ ("...read more")):(action.data.noteContent)}
              </p>
              <div className="  border-t border-gray-300 flex flex-row gap-x-2 place-items-center justify-end py-2 px-1 mt-4">
              <div><ViewModal props={action}/></div>
              <div> <OverlayEdit props={action} /></div>
               
              </div>
            </div>
            {/* <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span> */}
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        renderOnZeroPageCount={null}
        breakLabel={"..."}
        nextClassName="text-black bg-white px-3 py-1 rounded-md shadow-md hover:bg-gray-200"
        previousClassName="text-black bg-white px-3 py-1 rounded-md shadow-md hover:bg-gray-200"
        containerClassName="flex justify-center gap-x-4"
        pageClassName="text-black bg-white px-3 py-1 rounded-md shadow-md hover:bg-gray-200"
        activeClassName="bg-gray-200"
      />
    </>
  );
}

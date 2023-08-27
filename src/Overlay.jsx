
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import swal from 'sweetalert'
import { v4 as uuidv4 } from 'uuid';
import supabase from './supabaseClient';



export default function Example() {
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState({
    noteTitle: "",
    noteContent: "",

  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const resetFormData = () => {
    setFormData({
      noteTitle: "",
      noteContent: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("notes").insert([
        {
          note_id: uuidv4(),
          data: formData,
          
        },
      ]);
      swal({
        title: "Note Added!",
        text: "Your note has been added successfully!",
        icon: "success",
        button: "OK",
      });
      resetFormData(); // Reset the form data after the alert
    } catch (error) {
      swal({
        title: "Error!",
        text: "There was some error in adding the note. Please try again!",
        icon: "error",
        button: "OK",
      });
    } finally {
      resetFormData();
      setOpen(false);
      
    }
  };


  return (
    <>
    <button
      type="button"
      className="inline-flex items-center place-items-center gap-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
      onClick={() => setOpen(true)}
    ><Bars3Icon className="h-6 w-6"/></button>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">New Note</Dialog.Title>
                            <p className="text-sm text-gray-500">
                              You can start adding a new note by adding the content in fields given below.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        {/* Project name */}
                        <div className="space-y-1 px-4 sm:flex sm:flex-col sm:gap-y-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              Note Title
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              name="noteTitle"
                              onChange={handleChange}
                      
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base p-2"
                            />
                          </div>
                        </div>

                        {/* Project description */}
                        <div className="space-y-1 px-4 sm:flex sm:flex-col sm:gap-y-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              Note Content
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <textarea
                            
                              name="noteContent"
                              onChange={handleChange}
                              rows={6}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              defaultValue={''}
                            />
                          </div>
                        </div>

                    
                      
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const formatter = new Intl.NumberFormat("en-GB", { style: "decimal" });
const formatNumber = (num) => formatter.format(num);

export default function ProjectDetail({
  open,
  setOpen,
  project,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
  project: any;
}) {
  console.debug(project);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      <a
                        href={project?.["Official link"]}
                        className="underline"
                      >
                        {project?.["Project title"]}
                      </a>
                    </Dialog.Title>

                    <div className="mt-2 text-left">
                      <h4>How much do you need to raise (in US dollars)?</h4>
                      <p className="text-sm text-gray-500">
                        $
                        {formatNumber(
                          project?.[
                            "How much do you need to raise (in US dollars)?"
                          ],
                        )}
                      </p>
                    </div>

                    <div className="mt-2 text-left">
                      <h4>Tell us about your project</h4>
                      <p className="text-sm text-gray-500">
                        {project?.["Tell us about your project."]}
                      </p>
                    </div>

                    <div className="mt-2 text-left">
                      <h4>What will the funds be used for?</h4>
                      <p className="text-sm text-gray-500">
                        {project?.["What will the funds be used for?"]}
                      </p>
                    </div>

                    <div className="mt-2 text-left">
                      <h4>What progress have you made?</h4>
                      <p className="text-sm text-gray-500">
                        {project?.["What progress have you made?"]}
                      </p>
                    </div>

                    <div className="mt-2 text-left">
                      <h4>
                        Why are you the right person to make this project?
                      </h4>
                      <p className="text-sm text-gray-500">
                        {
                          project?.[
                            "Why are you the right person to make this project?"
                          ]
                        }
                      </p>
                    </div>

                    <div className="mt-2 text-left">
                      <a
                        href={project?.["Video or image"]}
                        className="text-center underline"
                      >
                        Video or image
                      </a>

                      {project?.["Video or image"].startsWith(
                        "https://www.veed.io",
                      ) && (
                        <iframe
                          src={project?.["Video or image"]}
                          width="450"
                          height="450"
                          title="EyeJack X"
                        ></iframe>
                      )}

                      {(project?.["Video or image"].endsWith(".mp4") ||
                        project?.["Video or image"].endsWith(".mov")) && (
                        <video
                          className=""
                          controls
                          height={450}
                          width={450}
                          src={project?.["Video or image"]}
                        />
                      )}
                      {(project?.["Video or image"].endsWith(".jpg") ||
                        project?.["Video or image"].endsWith(".png") ||
                        project?.["Video or image"].endsWith(".gif")) && (
                        <img
                          className=""
                          src={project?.["Video or image"]}
                          alt="project demo image"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}


import Image from "next/image";
// import { PencilIcon } from "@heroicons/react/outline";
import SelectOptions from "../../../ui/selectoptions";
import {ChevronDown} from 'lucide-react'

export default function BlogTable({ data }) {

  const formatText = (text, wordsPerLine = 3) => {
    const words = text.split(' ');
    let lines = [];

    // Split the text into chunks of wordsPerLine words
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }
    return lines;
  };

  // const titleLines = formatText(person.title, 3); // Split into 3 words per line
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500   tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500   tracking-wider"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500   tracking-wider"
                  >
                    Categories
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500   tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500   tracking-wider"
                  >
                    Status
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((person) => (
                  <tr key={person.email}>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={person.image}
                            alt=""
                            width={500}
                            height={150}
                          />
                        </div> */}
                        <div className="text-sm text-gray-700 font-semibold">
                          {person.title.split(' ').reduce((acc, word, index) => {
                            const lineIndex = Math.floor(index / 3); // Change 3 to 4 if you want more words per line
                            if (!acc[lineIndex]) {
                              acc[lineIndex] = []; // Initialize the line if it doesn't exist
                            }
                            acc[lineIndex].push(word);
                            return acc;
                          }, []).map((line, index) => (
                            <div key={index}>{line.join(' ')}</div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div >
                        <div className="text-sm font-medium text-gray-900">
                          {person.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person.email}
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.categories}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div >
                        <div className="text-sm font-medium text-gray-900">
                          Published
                        </div>
                        <div className="text-sm text-gray-500">
                          2024/10/01 at 5:11 am
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${person.Status === 'publish' ? 'bg-green-100 text-green-800' :
                          person.Status === 'un publish' ? 'bg-red-100 text-red-800' :
                            person.Status === 'pending review' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'}`}>
                        {person.Status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* <a
                        href="#"
                        className="flex gap-2 text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-4 w-4" />
                        
                      </a> */}
                      <SelectOptions/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

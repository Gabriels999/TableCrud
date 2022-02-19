import React from "react";
import { BsPencil } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

const ReadOnlyRow = ({ props, HandleEditClick, HandleDelete }) => {
  return (
    <tr key={props.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {props.nome}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{props.idade}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props.civil}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props.cpf}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props.cidade}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props.estado}
      </td>
      <td className="ps-6 pe-2 py-4 whitespace-nowrap text-sm text-black-500 flex gap-x-2">
        <button
          className="bg-indigo-500 w-8 h-8 rounded-lg transition duration-200 hover:scale-110 ease-in-out flex justify-center items-center shadow-xl"
          onClick={(event) => HandleEditClick(props)}
        >
          <BsPencil />
        </button>
        <button
          className="bg-red-500 w-8 h-8 rounded-lg transition duration-200 hover:scale-110 ease-in-out flex justify-center items-center shadow-xl"
          onClick={(e) => HandleDelete(props.id)}
        >
          <GrClose />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;

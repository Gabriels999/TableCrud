import React from "react";
import { ImBlocked } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";

const EditableRow = ({
  editValues,
  HandleEditSubmit,
  HandleEditFormSubmit,
  HandleEditCancel,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-black-900">
              <input
                type="text"
                value={editValues.nome}
                onChange={HandleEditSubmit}
                id="nome"
                placeholder=" Nome"
                className="bg-gray-200 rounded text-start"
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-black-900">
          <input
            type="text"
            value={editValues.idade}
            onChange={HandleEditSubmit}
            id="idade"
            placeholder=" Idade"
            className="bg-slate-200 w-16 rounded text-start"
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
        <input
          type="text"
          value={editValues.civil}
          onChange={HandleEditSubmit}
          id="civil"
          placeholder=" Estado Civil"
          className="bg-gray-200 w-24 rounded text-start"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
        <input
          type="text"
          value={editValues.cpf}
          onChange={HandleEditSubmit}
          id="cpf"
          placeholder=" CPF"
          className="bg-gray-200 w-2/3 rounded text-start"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
        <input
          type="text"
          value={editValues.cidade}
          onChange={HandleEditSubmit}
          id="cidade"
          placeholder=" Cidade"
          className="bg-gray-200 rounded text-start"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
        <input
          type="text"
          value={editValues.estado}
          onChange={HandleEditSubmit}
          id="estado"
          placeholder=" Estado"
          className="bg-gray-200 w-2/3 rounded text-start"
        />
      </td>
      <td className="ps-6 pe-2 py-4 whitespace-nowrap text-sm text-black-500 flex gap-x-2">
        <button
          className="bg-lime-600 w-8 h-8 rounded-lg transition duration-200 hover:scale-110 ease-in-out flex justify-center items-center shadow-xl"
          type="submit"
          onClick={HandleEditFormSubmit}
        >
          <BsCheckLg />
        </button>
        <button
          className="bg-red-500 w-8 h-8 rounded-lg transition duration-200 hover:scale-110 ease-in-out flex justify-center items-center shadow-xl"
          onClick={HandleEditCancel}
        >
          <ImBlocked />
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
